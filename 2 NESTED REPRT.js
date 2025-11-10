(function () {
  var $ = apex.jQuery;

  // --- Create placeholders if not exist ---
  if (!$('#detail_placeholder').length) {
    $('body').append('<div id="detail_placeholder" style="display:none;"></div>');
  }
  if (!$('#sub_placeholder').length) {
    $('body').append('<div id="sub_placeholder" style="display:none;"></div>');
  }

  // --- Inject CSS once ---
  if (!$('#nested-style').length) {
    $('head').append(`
      <style id="nested-style">
        #AR, #AR_SUB {
          transition: all 0.25s ease;
          opacity: 0;
          transform: translateY(-8px);
        }
        #AR.showing, #AR_SUB.showing {
          opacity: 1;
          transform: translateY(0);
        }

        tr.my_custom_row td, tr.sub_detail_row td {
          padding: 12px 16px;
          background: #f9f9f9;
          border-top: 1px solid #ddd;
        }

        .nested-wrapper, .sub-wrapper {
          height: 450px;
          overflow-y: auto;
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          padding: 8px 10px;
          display: none;
        }

        .expanded .nested-wrapper, .expanded .sub-wrapper {
          display: block;
          opacity: 1;
        }

        table.report-table thead {
          position: sticky;
          top: 0;
          background: #f1f1f1;
          z-index: 10;
          border-bottom: 2px solid #ccc;
        }

        /* Scrollbar styling */
        .nested-wrapper::-webkit-scrollbar,
        .sub-wrapper::-webkit-scrollbar {
          width: 8px;
        }
        .nested-wrapper::-webkit-scrollbar-thumb,
        .sub-wrapper::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
      </style>
    `);
  }

  // ===========================
  // 1️⃣ FIRST-LEVEL EXPAND (AR)
  // ===========================
  $(document).on('click', '.btn-expand', function (e) {
    e.preventDefault();
    var $btn = $(this);
    var $tr = $btn.closest('tr');
    var coaId = $btn.data('coa_id');

    if (!coaId) {
      console.warn('No Account ID found.');
      return;
    }

    var $open = $('tr.my_custom_row.expanded');
    var sameRow = $tr.next('.my_custom_row').hasClass('expanded');

    if (sameRow) {
      closeRow($tr.next('.my_custom_row'));
      return;
    }

    if ($open.length) {
      closeRow($open, openNewRow);
    } else {
      openNewRow();
    }

    function openNewRow() {
      var colspan = $tr.find('td').length;
      $tr.after(`<tr class="my_custom_row"><td colspan="${colspan}"><div class="nested-wrapper"></div></td></tr>`);
      var $wrapper = $tr.next().find('.nested-wrapper');

      // Move #AR region into this wrapper
      $wrapper.append($('#AR').removeClass('showing').show());
      apex.item('P933_ACCOUNT_ID').setValue(coaId);

      setTimeout(() => {
        apex.region('AR').refresh();
        requestAnimationFrame(() => {
          $tr.next().addClass('expanded');
          $('#AR').addClass('showing');
        });
      }, 300);
    }

    function closeRow($row, cb) {
      $('#AR').removeClass('showing');
      $row.removeClass('expanded');
      setTimeout(() => {
        $('#detail_placeholder').append($('#AR').hide());
        $row.remove();
        apex.item('P933_ACCOUNT_ID').setValue('');
        if (cb) cb();
      }, 350);
    }
  });

  // ===========================
  // 2️⃣ SECOND-LEVEL EXPAND (AR_SUB)
  // ===========================
  $(document).on('click', '.btn-sub-expand', function (e) {
    e.preventDefault();
    var $btn = $(this);
    var $tr = $btn.closest('tr');
    var detailId = $btn.data('detail_id');

    if (!detailId) {
      console.warn('No sub-detail ID found.');
      return;
    }

    var $openSub = $('tr.sub_detail_row.expanded');
    var sameSub = $tr.next('.sub_detail_row').hasClass('expanded');

    if (sameSub) {
      closeSubRow($tr.next('.sub_detail_row'));
      return;
    }

    if ($openSub.length) {
      closeSubRow($openSub, openSubRow);
    } else {
      openSubRow();
    }

    function openSubRow() {
      var colspan = $tr.find('td').length;
      $tr.after(`<tr class="sub_detail_row"><td colspan="${colspan}"><div class="sub-wrapper"></div></td></tr>`);
      var $wrapper = $tr.next().find('.sub-wrapper');

      // Move #AR_SUB region here
      $wrapper.append($('#AR_SUB').removeClass('showing').show());
      apex.item('P933_SUB_ID').setValue(detailId);

      setTimeout(() => {
        apex.region('AR_SUB').refresh();
        requestAnimationFrame(() => {
          $tr.next().addClass('expanded');
          $('#AR_SUB').addClass('showing');
        });
      }, 250);
    }

    function closeSubRow($row, cb) {
      $('#AR_SUB').removeClass('showing');
      $row.removeClass('expanded');
      setTimeout(() => {
        $('#sub_placeholder').append($('#AR_SUB').hide());
        $row.remove();
        apex.item('P933_SUB_ID').setValue('');
        if (cb) cb();
      }, 250);
    }
  });
})();

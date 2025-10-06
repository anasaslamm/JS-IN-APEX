// 2 level report


(function(){
  var $ = apex.jQuery;

  // placeholder for hidden region
  if (!$('#detail_placeholder').length) {
    $('body').append('<div id="detail_placeholder" style="display:none;"></div>');
  }

  // Inject refined CSS
  if (!$('#nested-style').length) {
    var css = `
    #detail_region {
      transition: all 0.25s ease;
      opacity: 0;
      transform: translateY(-8px);
    }
    #detail_region.showing {
      opacity: 1;
      transform: translateY(0);
    }
    tr.my_custom_row td {
      padding: 12px 16px;      /* restore APEX-like padding */
      background: #f9f9f9;     /* subtle background to separate visually */
      border-top: 1px solid #ddd;
    }
    tr.my_custom_row .nested-wrapper {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.35s ease, opacity 0.25s ease;
      border-radius: 8px;
      background: #fff;        /* restore report region background */
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      padding: 8px 10px;
    }
    tr.my_custom_row.expanded .nested-wrapper {
      max-height: 1200px;
      opacity: 1;
    }`;
    $('head').append('<style id="nested-style">' + css + '</style>');
  }

  $(document).on('click', '.btn-expand', function(e){
    e.preventDefault();
    var $btn = $(this);
    var $tr = $btn.closest('tr');

    setTimeout(function(){
      var company = $btn.data('company') || $btn.attr('data-company') || $v('P38_COMPANY');
      if (!company) {
        console.warn('No company id found');
        return;
      }

      var $openRow = $('tr.my_custom_row.expanded');
      var isSame = $tr.next('.my_custom_row').length && $tr.next('.my_custom_row').hasClass('expanded');

      if (isSame) {
        closeRow($tr.next('.my_custom_row'));
        return;
      }

      if ($openRow.length) {
        closeRow($openRow, openNewRow);
      } else {
        openNewRow();
      }

      function openNewRow(){
        var colspan = $tr.find('td').length || 1;
        $tr.after('<tr class="my_custom_row"><td colspan="' + colspan + '"><div class="nested-wrapper"></div></td></tr>');
        var $wrapper = $tr.next('.my_custom_row').find('.nested-wrapper');

        // move the region inside the wrapper
        $wrapper.append($('#detail_region').removeClass('showing').show());
        $s('P38_COMPANY', company);

        setTimeout(function(){
          try {
            apex.region('detail_region').refresh();
          } catch (err) {
            console.warn('detail_region refresh error:', err);
          }
          requestAnimationFrame(function(){
            $tr.next('.my_custom_row').addClass('expanded');
            $('#detail_region').addClass('showing');
          });
        }, 200);
      }

      function closeRow($row, callback){
        $('#detail_region').removeClass('showing');
        $row.removeClass('expanded');
        setTimeout(function(){
          $('#detail_placeholder').append($('#detail_region').hide());
          $row.remove();
          $s('P38_COMPANY', '');
          if (callback) callback();
        }, 350);
      }
    }, 40);
  });
})();

var NOTIF=(function(){

  function _injectStyles(){
    if(document.getElementById('nd-s'))return;
    var s=document.createElement('style');
    s.id='nd-s';
    s.textContent=
      '#nd{display:none;position:absolute;top:calc(100% + 6px);right:0;width:340px;'+
      'background:#fff;border:0.5px solid rgba(0,0,0,0.12);border-radius:12px;'+
      'overflow:hidden;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.1)}'+
      '.nd-h{padding:12px 16px;display:flex;align-items:center;justify-content:space-between;'+
      'border-bottom:0.5px solid rgba(0,0,0,0.08);background:#fff}'+
      '.nd-h-title{font-size:14px;font-weight:600;color:#1a1a2e}'+
      '.nd-mab{font-size:12px;color:#185fa5;background:none;border:none;cursor:pointer;'+
      'padding:4px 8px;border-radius:6px}'+
      '.nd-mab:hover{background:#e6f1fb}'+
      '#nd-list{max-height:320px;overflow-y:auto}'+
      '.nd-item{display:flex;gap:10px;padding:10px 14px;cursor:pointer;position:relative;'+
      'border-bottom:0.5px solid rgba(0,0,0,0.06);transition:background 0.3s}'+
      '.nd-item.unread{background:#f0f7ff}'+
      '.nd-item:hover{background:#e8f4fd}'+
      '.nd-item.flash{background:#ffe8a0;transition:background 0s}'+
      '.nd-icon{width:36px;height:36px;border-radius:50%;flex-shrink:0;'+
      'display:flex;align-items:center;justify-content:center;font-size:15px;margin-top:2px}'+
      '.nd-body{flex:1;min-width:0}'+
      '.nd-title{font-size:13px;font-weight:500;color:#1a1a2e;white-space:nowrap;'+
      'overflow:hidden;text-overflow:ellipsis}'+
      '.nd-msg{font-size:12px;color:#555;line-height:1.4;display:-webkit-box;'+
      '-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-top:1px}'+
      '.nd-time{font-size:11px;color:#aaa;margin-top:3px}'+
      '.nd-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0}'+
      '.nd-dot{width:8px;height:8px;border-radius:50%;background:#378add;margin-top:4px}'+
      '.nd-rb{font-size:11px;color:#185fa5;background:#e6f1fb;border:none;cursor:pointer;'+
      'padding:2px 7px;border-radius:10px;white-space:nowrap;opacity:0;transition:opacity 0.2s}'+
      '.nd-item:hover .nd-rb{opacity:1}'+
      '.nd-f{padding:10px;text-align:center;border-top:0.5px solid rgba(0,0,0,0.08);background:#fafafa}'+
      '.nd-f a{font-size:13px;color:#185fa5;text-decoration:none;font-weight:500}';
    document.head.appendChild(s);
  }

  function _getBell(){
    return document.getElementById('notification')
        ||(document.querySelector('.fa-bell-o')&&
           document.querySelector('.fa-bell-o').closest('a'));
  }

function _buildDropdown(anchor){

    // ✅ Append to BODY — completely outside wwvFlowForm
    var dd = document.createElement('div');
    dd.id = 'nd';
    dd.innerHTML =
      '<div class="nd-h">'+
        '<span class="nd-h-title">Notifications</span>'+
        '<span class="nd-mab" onclick="NOTIF.markAllRead()">Mark all as read</span>'+
      '</div>'+
      '<div id="nd-list"></div>'+
      '<div class="nd-f">'+
        '<a href="f?p=&APP_ID.:YOUR_PAGE_NO.:&SESSION.">View all notifications</a>'+
      '</div>';
    document.body.appendChild(dd);

    // ✅ Position it under the bell using getBoundingClientRect
    function _position(){
      var rect = anchor.getBoundingClientRect();
      dd.style.position = 'fixed';   // fixed so it works regardless of scroll
      dd.style.top  = (rect.bottom + 6) + 'px';
      dd.style.right = (window.innerWidth - rect.right) + 'px';
    }

    anchor.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      if(dd.style.display==='block'){
        dd.style.display='none';
      } else {
        _position();
        dd.style.display='block';
        NOTIF.load();
      }
    });

    document.addEventListener('click',function(){
      dd.style.display='none';
    });

    dd.addEventListener('click',function(e){
        e.stopPropagation(); 
        e.preventDefault(); 
    });

  }

  function _icons(){
    return{
      'INFO':   {bg:'#e6f1fb',cl:'#185fa5',ic:'fa fa-info-circle'},
      'SUCCESS':{bg:'#eaf3de',cl:'#3b6d11',ic:'fa fa-check-circle'},
      'WARNING':{bg:'#faeeda',cl:'#854f0b',ic:'fa fa-exclamation-triangle'},
      'DANGER': {bg:'#fcebeb',cl:'#a32d2d',ic:'fa fa-times-circle'}
    };
  }

  function _render(data){
    var list=document.getElementById('nd-list');
    if(!data||!data.length){
      list.innerHTML='<p style="padding:24px;text-align:center;font-size:13px;color:#888">No notifications</p>';
      return;
    }
    var ic=_icons();
    list.innerHTML=data.map(function(n){
      var i=ic[n.type]||ic.INFO,u=(n.read==='N');
      return '<div class="nd-item'+(u?' unread':'')+'" id="ni-'+n.id+'" onclick="NOTIF.flashItem('+n.id+',event)">'+
        '<div class="nd-icon" style="background:'+i.bg+';color:'+i.cl+'">'+
          '<span class="'+i.ic+'"></span></div>'+
        '<div class="nd-body">'+
          '<div class="nd-title">'+n.title+'</div>'+
          '<div class="nd-msg">'+n.msg+'</div>'+
          '<div class="nd-time">'+n.time+'</div>'+
        '</div>'+
        '<div class="nd-right">'+
          (u?'<div class="nd-dot"></div>':'<div style="width:8px"></div>')+
          (u ? '<span class="nd-rb" onclick="event.stopPropagation();NOTIF.flashItem('+n.id+',event)">✓ read</span>' : '<div></div>')
        '</div>'+
      '</div>';
    }).join('');
  }

  // ✅ PRIVATE function — correct placement
  function _applyBadge(label,count){
    label.style.cssText=
      'background:'+(count&&count!=='0'?'red':'#888')+';'+
      'color:#fff;font-size:10px;position:absolute;top:5px;right:5px;'+
      'width:16px;height:16px;border-radius:50%;'+
      'display:flex;align-items:center;justify-content:center;font-weight:bold';
    if(!count||count==='')label.innerText='0';
  }

  // ✅ ALL public methods inside return{} — this was broken before
  return{

    init:function(){
      _injectStyles();
      var bell=_getBell();
      if(!bell)return;
      _buildDropdown(bell);
      this.styleBadge();
      setInterval(function(){NOTIF.refresh();},30000);
    },

    // ✅ NOW INSIDE return{} — was outside before causing crash
    styleBadge:function(){
      var bell=_getBell();if(!bell)return;
      var l=bell.querySelector('.t-Button-label');if(!l)return;
      var count=l.innerText.trim();
      if(!count)l.innerText='0';
      _applyBadge(l,count);
    },

    // ✅ NOW INSIDE return{} — was outside before causing crash
    refresh:function(){
      apex.server.process('SET_NOTIFICATION',{},{
        dataType:'json',
        success:function(p){
          var bell=_getBell();if(!bell)return;
          var l=bell.querySelector('.t-Button-label');if(!l)return;
          var count=p.label||'0';
          l.innerText=count;
          _applyBadge(l,count);
        }
      });
    },

    load:function(){
      var list=document.getElementById('nd-list');if(!list)return;
      list.innerHTML='<p style="padding:20px;text-align:center;font-size:13px;color:#888">Loading...</p>';
      apex.server.process('GET_NOTIFICATION_DETAILS',{},{
        dataType:'json',
        success:function(data){_render(data);},
        error:function(){
          list.innerHTML='<p style="padding:16px;text-align:center;font-size:13px;color:#888">Could not load.</p>';
        }
      });
    },

    flashItem:function(id,e){
      if(e){e.preventDefault();e.stopPropagation();}
      var el=document.getElementById('ni-'+id);
      if(!el||!el.classList.contains('unread'))return;
      el.classList.add('flash');
      setTimeout(function(){
        el.classList.remove('flash');
        NOTIF.markOne(id,null);
      },600);
    },

    markOne:function(id,e){
      if(e){e.preventDefault();e.stopPropagation();}
      var el=document.getElementById('ni-'+id);
      if(el){el.classList.remove('unread');el.style.background='transparent';}
      apex.server.process('MARK_NOTIFICATION_READ',{x01:id},{
        dataType:'json',
        success:function(){NOTIF.refresh();NOTIF.load();}
      });
    },

    markAllRead:function(){
  apex.server.process('MARK_ALL_NOTIFICATIONS_READ',{},{
    dataType:'json',
    success:function(){NOTIF.load();NOTIF.refresh();},
    // ✅ Add this — shows what server actually returned
    error:function(xhr){
      console.error('markAllRead error:',xhr.responseText);
    }
  });
},

  };
}());

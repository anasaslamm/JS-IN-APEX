𝐓𝐡𝐞𝐦𝐞 𝐑𝐨𝐥𝐥𝐞𝐫 𝐂𝐮𝐬𝐭𝐨𝐦 𝐂𝐒𝐒 ->

@media only screen and (max-width: 991px) {
 /* freeze the page body */
 .apex-side-nav.js-navExpanded .t-Header,
 .apex-side-nav.js-navExpanded .t-Body-main,
 .apex-side-nav.js-navExpanded .t-Body-title {
   transform: none !important; left: 0 !important; margin-left: 0 !important; margin-inline-start: 0 !important;
 }
 /* floating menu base & slide animation */
 .apex-side-nav .t-Body-nav {
   position: fixed !important; z-index: 2000 !important; top: 0 !important; left: 0 !important; height: 100vh !important;
   transform: translate3d(-100%, 0, 0) !important; 
   transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; 
 }
 .apex-side-nav.js-navExpanded .t-Body-nav {
   transform: translate3d(0, 0, 0) !important; box-shadow: 4px 0 15px rgba(0, 0, 0, 0.5) !important;
 }
 /* clickable dark backdrop */
 .apex-side-nav .t-Body-main::before {
   content: ""; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
   background-color: rgba(0, 0, 0, 0.6); z-index: 1999; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
 }
 .apex-side-nav.js-navExpanded .t-Body-main::before {
   opacity: 1; pointer-events: auto; 
 }
}

𝐆𝐥𝐨𝐛𝐚𝐥 𝐏𝐚𝐠𝐞 (𝐏𝐚𝐠𝐞 0) -> 𝐏𝐚𝐠𝐞 𝐋𝐨𝐚𝐝 𝐃𝐀:

/* closes the menu when the dark background is tapped */
$(document).on('click', '.apex-side-nav.js-navExpanded .t-Body-main', function(e) {
  if (e.target === this) {
    $('#t_Button_navControl').click(); 
  }
});

Hope this helps!

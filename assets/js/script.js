// loading container

let loading = document.querySelector(".preloader");
setTimeout(()=>{
    loading.style.display = "none"
}, 1500)

// workflow accordian


// define the custom element
class CircleExpand extends HTMLElement {
    constructor() {
      super()
      this.innerHTML =
        `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 14H21" stroke="var(--font-color)" stroke-width="1.5" stroke-linecap="round" />
        <path d="M14 14V7" stroke="var(--font-color)" stroke-width="1.5" stroke-linecap="round" />
        <path d="M14 14V21" stroke="var(--font-color)" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="14" cy="14" r="12.75" stroke="var(--font-color)" stroke-width="1.5" />
      </svg>
      `;
    }

    connectedCallback() {
      const circle = this.querySelector('svg circle');
      const top = this.querySelector('svg path:nth-of-type(2)');
      const bottom = this.querySelector('svg path:nth-of-type(3)');

      const circle_length = this.pathLength(circle);
      const top_length = this.pathLength(top);
      const bottom_length = this.pathLength(bottom);

      circle.style.setProperty('--circle-length', circle_length + 0.5);
      top.style.setProperty('--top-length', top_length);
      bottom.style.setProperty('--bottom-length', bottom_length);
    }

    pathLength(element) {
      return element.getTotalLength();
    }
  }

  customElements.define('circle-expand', CircleExpand);

  const summary = document.querySelectorAll('summary');

  for (let i = 0; i < summary.length; i++) {
    summary[i].innerHTML += '<circle-expand></circle-expand>';
  }

  // details element
  const details_element = document.querySelectorAll('details');

  for (let i = 0; i < details_element.length; i++) {
    details_element[i].isTransitioning = false;

    const summary_elememnt = details_element[i].querySelector('summary');
    const content_element = details_element[i].querySelector('details-content');

    summary_elememnt.addEventListener('click', (e) => {
      e.preventDefault();

      if (details_element[i].isTransitioning) {
        return;
      }

      details_element[i].isTransitioning = true;

      if (details_element[i].hasAttribute('open')) {
        content_element.style.height = '0';
        content_element.style.paddingBlockStart = '0';
        summary_elememnt.toggleAttribute('expanded');

        content_element.addEventListener('transitionend', function handleClose() {
          details_element[i].removeAttribute('open');
          details_element[i].isTransitioning = false;
          content_element.removeEventListener('transitionend', handleClose);
        });
      } else {
        details_element[i].setAttribute('open', '');
        summary_elememnt.toggleAttribute('expanded');

        content_element.style.height = content_element.scrollHeight + 'px';

        content_element.addEventListener('transitionend', function handleOpen() {
          content_element.style.height = 'none';
          details_element[i].isTransitioning = false;
          content_element.removeEventListener('transition', handleOpen);
        });
      }
    });
  }



// counter start


$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};


$('#number1').jQuerySimpleCounter({end: 12,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 55,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 359,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 246,duration: 2500});



/* AUTHOR LINK */
 $('.about-me-img').hover(function(){
        $('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');
    }, function(){
        $('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');
    });


// counter end


// add navbar background on scroll

const navbar = document.querySelector("nav")

window.onscroll = function(){
  if(navbar){
    if(window.scrollY > 400){
      navbar.classList.add("black-nav")
    }
    else if(window.scrollY < 400){
      navbar.classList.remove("black-nav")
    }
  }
}
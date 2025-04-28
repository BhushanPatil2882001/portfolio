// loading container

let loading = document.querySelector(".preloader");
setTimeout(()=>{
    loading.style.display = "none"
}, 1500)

// custom cursor start
const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX + window.scrollX;
  mouseY = e.clientY + window.scrollY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;

  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor(); 

document.addEventListener('mousedown', () => {
  cursor.classList.add('clicked');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('clicked');
});


// custom cursor end

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


// animated headline

jQuery(document).ready(function ($) {
  //set animation timing
  var animationDelay = 2500,
      //loading bar effect
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
      //letters effect
      lettersDelay = 50,
      //type effect
      typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect 
      revealDuration = 600,
      revealAnimationDelay = 1500;

  initHeadline();

  function initHeadline() {
      //insert <i> element for each letter of a changing word
      singleLetters($('.cd-headline.letters').find('b'));
      //initialise headline animation
      animateHeadline($('.cd-headline'));
  }

  function singleLetters($words) {
      $words.each(function () {
          var word = $(this),
              letters = word.text().split(''),
              selected = word.hasClass('is-visible');
          for (i in letters) {
              if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
              letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
          }
          var newLetters = letters.join('');
          word.html(newLetters).css('opacity', 1);
      });
  }

  function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function () {
          var headline = $(this);

          if (headline.hasClass('loading-bar')) {
              duration = barAnimationDelay;
              setTimeout(function () {
                  headline.find('.cd-words-wrapper').addClass('is-loading')
              }, barWaiting);
          } else if (headline.hasClass('clip')) {
              var spanWrapper = headline.find('.cd-words-wrapper'),
                  newWidth = spanWrapper.width() + 10
              spanWrapper.css('width', newWidth);
          } else if (!headline.hasClass('type')) {
              //assign to .cd-words-wrapper the width of its longest word
              var words = headline.find('.cd-words-wrapper b'),
                  width = 0;
              words.each(function () {
                  var wordWidth = $(this).width();
                  if (wordWidth > width) width = wordWidth;
              });
              headline.find('.cd-words-wrapper').css('width', width);
          };

          //trigger animation
          setTimeout(function () {
              hideWord(headline.find('.is-visible').eq(0))
          }, duration);
      });
  }

  function hideWord($word) {
      var nextWord = takeNext($word);

      if ($word.parents('.cd-headline').hasClass('type')) {
          var parentSpan = $word.parent('.cd-words-wrapper');
          parentSpan.addClass('selected').removeClass('waiting');
          setTimeout(function () {
              parentSpan.removeClass('selected');
              $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
          }, selectionDuration);
          setTimeout(function () {
              showWord(nextWord, typeLettersDelay)
          }, typeAnimationDelay);

      } else if ($word.parents('.cd-headline').hasClass('letters')) {
          var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
          hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
          showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
          $word.parents('.cd-words-wrapper').animate({
              width: '2px'
          }, revealDuration, function () {
              switchWord($word, nextWord);
              showWord(nextWord);
          });

      } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
          $word.parents('.cd-words-wrapper').removeClass('is-loading');
          switchWord($word, nextWord);
          setTimeout(function () {
              hideWord(nextWord)
          }, barAnimationDelay);
          setTimeout(function () {
              $word.parents('.cd-words-wrapper').addClass('is-loading')
          }, barWaiting);

      } else {
          switchWord($word, nextWord);
          setTimeout(function () {
              hideWord(nextWord)
          }, animationDelay);
      }
  }

  function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('type')) {
          showLetter($word.find('i').eq(0), $word, false, $duration);
          $word.addClass('is-visible').removeClass('is-hidden');

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
          $word.parents('.cd-words-wrapper').animate({
              'width': $word.width() + 10
          }, revealDuration, function () {
              setTimeout(function () {
                  hideWord($word)
              }, revealAnimationDelay);
          });
      }
  }

  function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');

      if (!$letter.is(':last-child')) {
          setTimeout(function () {
              hideLetter($letter.next(), $word, $bool, $duration);
          }, $duration);
      } else if ($bool) {
          setTimeout(function () {
              hideWord(takeNext($word))
          }, animationDelay);
      }

      if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
          var nextWord = takeNext($word);
          switchWord($word, nextWord);
      }
  }

  function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');

      if (!$letter.is(':last-child')) {
          setTimeout(function () {
              showLetter($letter.next(), $word, $bool, $duration);
          }, $duration);
      } else {
          if ($word.parents('.cd-headline').hasClass('type')) {
              setTimeout(function () {
                  $word.parents('.cd-words-wrapper').addClass('waiting');
              }, 200);
          }
          if (!$bool) {
              setTimeout(function () {
                  hideWord($word)
              }, animationDelay)
          }
      }
  }

  function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
  }

  function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
  }

  function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
  }
});
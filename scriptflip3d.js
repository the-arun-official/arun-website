gsap.set('.card', {
    autoAlpha: 1
  });
  let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  tl.to('.faces', {
    rotationY: 160,
    rotationX: -5,
    duration: 1,
    ease: 'power1.inOut',
    delay: 1
  })
    .to('.faces', {
      rotationY: 220,
      duration: 4,
      ease: 'none',
    })
    .to('.hover div', {
      scale: 1,
      stagger: .2,
      autoAlpha: 1,
      ease: 'back.out(2)'
    }, "< -=.4")
    .to('.text', {
      duration: 1,
      text: {
        value: 'This is me Arun❤️'
      }
    }, "< +=.5")
    .to('.count', {
      innerText: '1335',
      duration: 2,
      ease: Power4.easeOut,
      snap: {
        innerText: 5
      }
    }, '<')
    .to('.check', {
      autoAlpha: 1,
      stagger: .2
    }, "< +=.5")
    .to('.hover div', {
      duration: .2,
      scale: 0,
      autoAlpha: 0,
      stagger: .1
    })
    .to('.faces', {
      rotationY: 360,
      rotationX: 0,
      duration: 1.5,
      ease: 'elastic.out(.8, .5)',
    }, "<")
  
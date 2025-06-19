import Lenis from 'lenis'

import { gsap } from "gsap";
    
import { CustomEase } from "gsap/CustomEase";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(Flip,ScrollTrigger,ScrollToPlugin,MotionPathPlugin,TextPlugin,CustomEase);

window.gsap = gsap;

const lenis = new Lenis();
window.lenis = lenis;

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0);

document.querySelectorAll('.anchor').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute("href"));
    });
});

window.addEventListener('DOMContentLoaded', () => {

    let data = sessionStorage.getItem("loader");
    const preloader = document.querySelector(".preloader");
    let preloaderLogoDark = document.querySelector(".preload-logo-dark");
    if (data) {
        // dont play loader
        preloader.parentElement.removeChild(preloader);

    } else {
        // play loader
        function hero() {

            let preloaderTL = gsap.timeline({});

            // PRELOADER
            preloaderTL.fromTo(preloaderLogoDark, {
                autoAlpha: 0,
            },
            {
                display: 'block',
                autoAlpha: 1,
                // display: 'flex',
            })

            preloaderTL.fromTo(preloaderLogoDark, {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            },
            {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.7,
                ease: 'Expo.easeInOut',
            });

            preloaderTL.to(".preloader-logo-wrapper", {
                autoAlpha: 0,
                duration: .7,
                ease: 'Expo.easeOut',
            })

            preloaderTL.fromTo(".preloader", {
                transformOrigin: "top",
            },
            {
                yPercent: 0,
                scaleY: 0,
                transformOrigin: 'bottom',
                duration: 1.4,
                ease: 'Expo.easeInOut',
            }, "<");
            // /PRELOADER
        }
        hero();
        // /HERO TIMELINE
    }

    sessionStorage.setItem('loader', 'true');

    const offsetTop = () => {
        let header = document.querySelector(".site-header");
        let offsetTop = document.querySelector('.offset-top')

        if (!header) return;

        console.log(header.offsetHeight);

        offsetTop.style.marginTop =  `${header.offsetHeight}px`;
    }

    offsetTop();


    let desktopMQ = window.matchMedia("(min-width:1024px)");
    // init nav menu
    const mobileMenu = () => {
        let button = document.querySelector('.menuBtn');
        let body = document.body;
        let header = document.querySelector('.site-header');
        let logo = header.querySelector('.header-logo img');
        let logoDark = logo.getAttribute('data-dark');
        console.log(logoDark);
        let logoLight = logo.getAttribute('data-light');
        let headerHeight = header.offsetHeight; 
        let menuElement = document.getElementById('mobile-menu');
        let menu = new SlideMenu(menuElement);

        menuElement.style.marginTop = headerHeight + 'px';

        button.addEventListener('click', () => {
            header.style.top = "0";

            button.classList.toggle('active');
            header.classList.toggle('active');
            // menu.classList.toggle('active');
            body.classList.toggle('freeze');

            // if( header.classList.contains('active')) {
            //     header.classList.add('dark');
            //     header.classList.remove('transparent');
            //     logo.setAttribute('src', logoDark);

            // } else {

            // }

            if (body.classList.contains('freeze')) {
                lenis.stop();
                console.log('lenis stopped');
            } else {
                lenis.start();
                console.log('lenis started');
            }

            

            if(button.classList.contains('active')) {
                menu.open();
            } else {
                menu.close();
            }
        });
    }

    mobileMenu();

    const initHeader = () => {
        let header = document.querySelector('.site-header');
        let heroBanner = document.querySelector('.hero-banner');
        let prevScrollpos = window.scrollY;
        let headerHeight = header.offsetHeight;
        let logo = header.querySelector('.header-logo img');
        let logoDark = logo.getAttribute('data-dark');
        let logoLight = logo.getAttribute('data-light');

        // DROPDOWN
        let dropdownParents = header.querySelectorAll('.dropdown-parent');

        if(!header) return;

        if(desktopMQ.matches) {
            dropdownParents.forEach((parent) => {
                let dropdownMenu = parent.querySelector('.dropdown-menu');
    
                const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize); // 1rem in px
                const headerHeightRem = headerHeight / remInPx;

                dropdownMenu.style.top = `${headerHeightRem}rem`;
    
                gsap.set(dropdownMenu, {autoAlpha: 0, yPercent: 5});
    
                function revealDropdown() {
                    if(dropdownMenu.classList.contains('visible')) {
                        parent.classList.add('active');
                        gsap.to(dropdownMenu, {
                            yPercent: 0,
                            autoAlpha: 1,
                            duration: .3,
                        });
                    } else {
                        parent.classList.remove('active');
                        gsap.to(dropdownMenu, {
                            yPercent: 5,
                            autoAlpha: 0,
                            duration: .3,
                            ease: 'Expo.easeInOut',
                        });
                    }
                }
    
                parent.addEventListener('mouseover', () => {
                    dropdownMenu.classList.add('visible');
                    revealDropdown();
                });
    
                parent.addEventListener('mouseleave', () => {
                    dropdownMenu.classList.remove('visible');
                    revealDropdown();
                });
            });

        // header.addEventListener('mouseover', () => {
        //     header.classList.add("visible");
        // });

        // header.addEventListener('mouseleave', () => {
        //     header.classList.remove("visible");
        // });



        // logo.setAttribute("src", logoDark);
        logo.setAttribute("src", logoLight);


        window.onscroll = function () {
            let currentScrollPos = window.scrollY;
            if (prevScrollpos > currentScrollPos) {
                header.style.top = "0";
            } else {
                if(header.classList.contains('visible')) {
                    header.style.top = "0";
                } else {
                    header.style.top = -headerHeight - 20 + "px";
                }
            }
            prevScrollpos = currentScrollPos;
        }


        if(!heroBanner) return;

        // const observer = new IntersectionObserver(
        //     ([entry]) => {
        //         if (entry.isIntersecting) {
        //             console.log("Intersecting");
        //             header.classList.remove('dark');
                    
        //             if(!header.classList.contains('visible')) {
        //                 header.classList.add('transparent');
        //                 header.classList.remove('dark');
        //                 logo.setAttribute("src", logoLight);
        //             } 

        //             header.addEventListener('mouseover', () => {
        //                 header.classList.add('visible');
        //                 header.classList.remove('transparent');
        //                 // logo.setAttribute('src', logoDark);
        //             });
            
        //             header.addEventListener('mouseleave', () => {
        //                 header.classList.remove('visible');
        //                 header.classList.remove('dark');
        //                 logo.setAttribute('src', logoLight);
        //             });


        //         } else {
        //             console.log("not Intersecting");
        //             header.classList.remove("transparent");
        //             header.classList.add("dark");
        //             // logo.setAttribute("src", logoDark);

        //             header.addEventListener('mouseover', () => {
        //                 header.classList.add("visible");
        //                 // logo.setAttribute('src', logoDark);
        //             });
            
        //             header.addEventListener('mouseleave', () => {
        //                 header.classList.remove("visible");
        //                 header.classList.add("dark");
        //                 // logo.setAttribute('src', logoDark);
        //             });
        //         }
        //     },
        //     { root: null, threshold: 0.1 } // Adjust threshold if necessary
        // );
    
        // observer.observe(heroBanner);

        // } else {
        //     header.classList.add("dark");
        //     // logo.setAttribute('src', logoDark);
        }

    }

    initHeader();

    // REVEAL ANIM
    const revealAnim = () => {
        let animSection = document.querySelectorAll(".reveal-anim");

        animSection.forEach((section) => {
            console.log(section);
            let revealFadeIn = section.querySelectorAll(".reveal-fade-in");
            let revealIMGWrapper = section.querySelectorAll('.reveal-img-wrapper');
            

            revealIMGWrapper.forEach(wrapper => {
                let revealIMG = wrapper.querySelector(".reveal-img");
                let revealIMGOverlay = wrapper.querySelector(".reveal-img-overlay");
                let duration = revealIMG.getAttribute("data-duration");
            
                let imageTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top 80%", // Trigger when the top of the element is 80% in view
                        toggleActions: "play none none none", // Reverse on scroll up
                        // markers: true,
                    }
                });

                if(revealIMG.classList.contains("reveal-img--right")) {
                    let setOverlayValues =  gsap.set(revealIMGOverlay, {scaleX: 0, transformOrigin: "left",});
                    let setImageValues = gsap.set(revealIMG, {autoAlpha: 0});

                    imageTl.add(setOverlayValues, setImageValues);

                    imageTl
                    .fromTo(revealIMGOverlay, {
                        'border-top-right-radius': '50%', 
                        'border-bottom-right-radius': '50%', 
                    },{
                        scaleX: 1,
                        ease: "expo.Out",
                        duration: duration,
                        'border-top-right-radius': '0%', 
                        'border-bottom-right-radius': '0%', 
                    })

                    imageTl
                    .to(revealIMGOverlay, {
                        scaleX: 0,
                        ease: "sine.inOut",
                        duration: duration,
                        transformOrigin: "right",
                        
                    },">+.5")

                    .to(revealIMG, {
                        autoAlpha: 1,
                        scale: 1,
                        duration: duration,
                        ease: "sine.out"
                    }, "<+.15") // Overlap animations slightly for a smoother transition
                    .to(revealIMGOverlay, {
                        autoAlpha: 0,
                        duration: 0.3
                    }, "-=0.2");

                } else {
                    let setOverlayValues =  gsap.set(revealIMGOverlay, {scaleY: 0, transformOrigin: "top",});
                    let setImageValues = gsap.set(revealIMG, {autoAlpha: 0});

                    imageTl.add(setOverlayValues, setImageValues);

                    imageTl
                        .to(revealIMGOverlay, {
                            scaleY: 1,
                            ease: "sine.inOut",
                            duration: duration
                        })
                        .to(revealIMGOverlay, {
                            scaleY: 0,
                            ease: "sine.inOut",
                            transformOrigin: "bottom",
                            duration: duration
                        },'>')
                        .fromTo(revealIMG, {
                            autoAlpha: 0,
                        }, {
                            autoAlpha: 1,
                            scale: 1,
                            duration: duration,
                            ease: "sine.out"
                        }, "<+.15") // Overlap animations slightly for a smoother transition
                        .to(revealIMGOverlay, {
                            autoAlpha: 0,
                            duration: 0.3
                        }, "-=0.2");
                    }
            });

            // IMAGE REVEAL
            // revealIMG.forEach(image => {
            //     if (image.classList.contains('reveal-img--right')) {
            //         gsap.set(image, {clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'});
            //     } else if (image.classList.contains('reveal-img--left')) {
            //         gsap.set(image, {clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'});
            //     } else if (image.classList.contains('reveal-img--top')) {
            //         gsap.set(image, {clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'});
            //     } else if (image.classList.contains('reveal-img--bottom')) {
            //         gsap.set(image, {clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'});
            //     }

            //     gsap.to(image, {
            //         clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            //         autoAlpha: 1,
            //         scale: 1,
            //         duration: 1.05,
            //         ease: 'smooth',
            //         scrollTrigger: {
            //             trigger: image,
            //             scrub: false,
            //             start: "center-=20% bottom-=20%",
            //             end: "top top+=80%",
            //             // markers: true,
            //             invalidateOnRefresh: true,
            //         },
            //     });
            // });

            // FADE IN LEFT,RIGHT & UP
            revealFadeIn.forEach(item => {
                gsap.set(item, {autoAlpha: 0});
                if (item.classList.contains('reveal-fade-in--right')) {
                    gsap.set(item, {autoAlpha: 0, xPercent: -10});
                } else if (item.classList.contains('reveal-fade-in--left')) {
                    gsap.set(item, {autoAlpha: 0, xPercent: 10});
                } else if (item.classList.contains('reveal-fade-in--up')) {
                    gsap.set(item, {autoAlpha: 0, yPercent: 10});
                }

                gsap.to(item, {
                    autoAlpha: 1,
                    xPercent: 0,
                    scale: 1,
                    duration: .7,
                    ease: 'expo.easeInOut',
                    scrollTrigger: {
                        trigger: item,
                        scrub: false,
                        start: "top bottom",
                        end: "top top+=80%",
                        // markers: true,
                        invalidateOnRefresh: true,
                    },
                });

                if(item.classList.contains('reveal-fade-in--up')) {
                    gsap.to(item, {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: .7,
                        ease: 'sine.out',
                        scrollTrigger: {
                            trigger: item,
                            scrub: false,
                            start: "top bottom",
                            end: "top top+=80%",
                            // markers: true,
                            invalidateOnRefresh: true,
                        },
                    });
                } 
            });
        });
    }
    revealAnim();
    // REVEAL ANIM

    const init = () => {
        const marquee = document.querySelectorAll('.marquee')

        if (!marquee) return

        marquee.forEach(item => {
            const marqueeInner = item.querySelector('.marquee__inner')
            const marqueeContent = marqueeInner.querySelector('.marquee__content')

            // Duration
            const duration = item.getAttribute('data-marquee-duration')

            // Element Clone
            const clone1 = marqueeContent.cloneNode(true)
            const clone2 = marqueeContent.cloneNode(true)
            marqueeInner.append(clone1, clone2);

            // Marquee animation
            const marqueeContentAll = marqueeInner.querySelectorAll('.marquee__content')
            marqueeContentAll.forEach(element => {
                gsap.to(element, {
                    x: "-101%",
                    repeat: -1,
                    duration: duration,
                    ease: 'linear'
                })
            })
        })
    }
    init();

    // PARALLAX ANIM
    const parallaxInit = () => {
        let parallaxSections = document.querySelectorAll('.parallax-section');

        parallaxSections.forEach(section => {
            let parallaxImages = section.querySelectorAll('.parallax-image');
            parallaxImages.forEach(image => {
                let heightDiff = image.offsetHeight - image.parentElement.offsetHeight;
                
                gsap.fromTo(image, {
                    y: -heightDiff,
                },
                {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: image,
                        scrub: true,
                        start: "top bottom",
                        end: () => "bottom center",
                        // markers: true,
                        invalidateOnRefresh: true,
                    },
                        
                });
            })

        });
    }
    parallaxInit();
    // /PARALLAX ANIM

    // DRAW SVG
    function drawSvg() {
        let gespiIcon = document.querySelector('.gespi-icon');

        console.log(gespiIcon);

        if(!gespiIcon) return;

        let line = gespiIcon.querySelector('#path');
        console.log(path);
        let topEllipse = document.querySelector('.radial-blur-elem');


        gsap.to(topEllipse, {
            duartion: 50,
            motionPath: {
                path: 'M185.301 103.553L186.044 103.966V102.65L186.141 102.598L369.5 1.59473V287.134L304.145 250.922L304.638 123.733L304.641 122.886L303.897 123.292L187.696 186.89L185.785 185.868H185.786L68.6055 121.086L67.8643 120.676V329.751L68.1172',
                autoRotate: true,
            },
        });
    }
    drawSvg();
    // DRAW SVG

    const initHoverEffects = () => {
        let buttons = document.querySelectorAll('.btn-lg-arrow');

        buttons.forEach(button => {
            const btntl = gsap.timeline({
                paused: true,
                duration: 0.01,
                ease: 'sine.easeIn'
            });
            let line = button.querySelector('.line');
            let text = button.querySelector('.btn-text');

            btntl.fromTo(
                button, {
                    padding: "2rem 4rem",
                }, {
                    padding: "3rem 5rem",
                }
            ).fromTo(line, {
                '--line-width' : "100%",
            }, {
                '--line-width': "0"
            }, "<").fromTo(text, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
            });

            
            button.addEventListener('mouseenter', () => {
                btntl.play(0);
            })

            button.addEventListener('mouseleave', () => {
                btntl.reverse();
            })
        })
    }
    initHoverEffects();

    window.addEventListener('resize', () => {
        initHeader();
        parallaxInit();
    });
});
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

    // REVEAL ANIM
    const revealAnim = () => {
        let animSection = document.querySelectorAll(".reveal-anim");

        animSection.forEach((section) => {
            let revealFadeIn = section.querySelectorAll(".reveal-fade-in");
            let revealIMGWrapper = section.querySelectorAll('.reveal-img-wrapper');
            
            // Set initial state for all .reveal-fade-in elements
            revealFadeIn.forEach((item) => {
                gsap.set(item, { autoAlpha: 0 });
            });

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

    let data = sessionStorage.getItem("loader");
    const preloader = document.querySelector(".preloader");
    let preloaderLogoDark = document.querySelector(".preload-logo-dark");

    if (data) {
        // Skip preloader
        preloader?.remove();
        revealAnim(); // ← Just run directly
    } else {
        function hero() {
            let preloaderTL = gsap.timeline({});

            // PRELOADER animations
            preloaderTL.fromTo(preloaderLogoDark, {
                autoAlpha: 0,
            }, {
                display: 'block',
                autoAlpha: 1,
            });

            preloaderTL.fromTo(preloaderLogoDark, {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            }, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.7,
                ease: 'Expo.easeInOut',
            });

            preloaderTL.to(".preloader-logo-wrapper", {
                autoAlpha: 0,
                duration: 0.7,
                ease: 'Expo.easeOut',
            });

            preloaderTL.fromTo(".preloader", {
                transformOrigin: "top",
            }, {
                yPercent: 0,
                scaleY: 0,
                transformOrigin: 'bottom',
                duration: 1.4,
                ease: 'Expo.easeInOut',
            }, "<");

            preloaderTL.call(() => {
                revealAnim();
            }, null, preloaderTL.duration() - 0.4)

            // Remove preloader at the very end
            .call(() => {
                preloader?.remove();
            });
        }

        hero();
    }

    sessionStorage.setItem('loader', 'true');

    const offsetTop = () => {
        let header = document.querySelector(".site-header");
        let offsetTop = document.querySelector('.offset-top')

        if (!header) return;
        if (!offsetTop) return;

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
        let logoLight = logo.getAttribute('data-light');
        let headerHeight = header.offsetHeight; 
        let menuElement = document.getElementById('mobile-menu');
        let menu = new SlideMenu(menuElement);

        menuElement.style.marginTop = headerHeight + 'px';

        if(!button) return;

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
            } else {
                lenis.start();
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
        let headerHeight = header.offsetHeight;
        let logo = header.querySelector('.header-logo img');
        let logoSmall = document.querySelector('.gespi-logo--small');

        // DROPDOWN
        let dropdownParents = header.querySelectorAll('.dropdown-parent');

        let animation; // store the Lottie animation instance
        let hasPlayed = false; // track if animation was already played in current scroll cycle

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const container = document.querySelector('.gespi-logo--small');
            if (!container) return;

            // Scroll crossed from below → above 20px
            if (scrollY > 20 && !hasPlayed) {
                hasPlayed = true;

                // If animation already exists, destroy and reinitialize it
                if (animation) {
                    animation.destroy();
                }

                // Load and play the Lottie animation
                animation = lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    path: 'themes/main/assets/js/gespi-logo--small.json',
                });
            }

            // Reset when user scrolls back below 20px
            if (scrollY <= 20 && hasPlayed) {
                hasPlayed = false;

            }
        });

        window.onscroll = function () {
            let currentScrollPos = window.scrollY;

            if (currentScrollPos < 20) {
                logoSmall.classList.remove('visible');
                logo.classList.add('visible');
                
            } else {
                logoSmall.classList.add('visible');
                logo.classList.remove('visible');
            }
        }

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

    const initHoverEffects = () => {
        let buttons = document.querySelectorAll('.btn-lg-arrow');

        if(!buttons) return;
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

    function btnSize() {
        let btns = document.querySelectorAll('.gespi-cta');
        if(!btns) return;
        btns.forEach((btn) => {
            let btnWidth = btn.offsetWidth;
            let btnAttribute = window.getComputedStyle(btn);
            let btnAttributeValue = btnAttribute.getPropertyValue("--btn-size");
            let btnSize = `${btnWidth}px`;
            btn.style.setProperty("--btn-size", btnSize);
        });
    }
    btnSize();

    let animationFrameId = null;

    function handleMouseMove(ev, wrap) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        animationFrameId = requestAnimationFrame(() => {
            const containers = wrap.querySelectorAll(".hover-blob-container");

            containers.forEach((container) => {
                const blob = container.querySelector(".blob");
                const fblob = container.querySelector(".fakeblob");

                if (!blob || !fblob) return;

                const fblobRect = fblob.getBoundingClientRect();
                const blobRect = blob.getBoundingClientRect();

                const mouseX = ev.clientX;
                const mouseY = ev.clientY;

                const offsetX = mouseX - fblobRect.left - blobRect.width / 2;
                const offsetY = mouseY - fblobRect.top - blobRect.height / 2;

                blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }

    const hoverBlobWraps = document.querySelectorAll('.hover-blob-wrap');
    if (!hoverBlobWraps) return;

    hoverBlobWraps.forEach((wrap) => {
        const mouseMoveHandler = (ev) => handleMouseMove(ev, wrap);

        wrap.addEventListener('mouseenter', () => {
            window.addEventListener('mousemove', mouseMoveHandler);
        });

        wrap.addEventListener('mouseleave', () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        });
    });
    
    window.addEventListener('resize', () => {
        initHeader();
        parallaxInit();
        btnSize();
    });
});
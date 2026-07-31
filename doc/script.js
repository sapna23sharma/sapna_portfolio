/* =====================================
   SAPNA SHARMA PORTFOLIO SCRIPT
===================================== */


document.addEventListener("DOMContentLoaded", () => {



/* =====================================
   SMOOTH SCROLL NAVIGATION
===================================== */


const navLinks = document.querySelectorAll(".nav a");


navLinks.forEach(link => {


    link.addEventListener("click", function(e){


        const target =
        document.querySelector(
            this.getAttribute("href")
        );


        if(target){


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


});








/* =====================================
   SCROLL REVEAL ANIMATION
===================================== */


const revealElements =
document.querySelectorAll(".reveal");



const revealObserver =
new IntersectionObserver(

(entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("active");


            revealObserver.unobserve(
                entry.target
            );


        }


    });


},

{

threshold:0.15

}

);



revealElements.forEach(element=>{


    revealObserver.observe(element);


});








/* =====================================
   ACTIVE NAVIGATION HIGHLIGHT
===================================== */


const sections =
document.querySelectorAll("section");


window.addEventListener("scroll",()=>{


let current="";



sections.forEach(section=>{


const position =
section.offsetTop - 150;



if(window.scrollY >= position){


current =
section.getAttribute("id");


}



});





navLinks.forEach(link=>{


link.style.color="#475569";



if(
link.getAttribute("href")
===
"#"+current
){


link.style.color="#4f46e5";


}



});



});








/* =====================================
   HERO TEXT TYPING EFFECT
===================================== */


const heroText =
document.querySelector(
".hero h1 span"
);



if(heroText){


const originalText =
heroText.textContent.trim();



heroText.textContent="";



let index=0;



function typeEffect(){


if(index < originalText.length){


heroText.textContent +=
originalText.charAt(index);



index++;


setTimeout(
typeEffect,
80
);



}



}



setTimeout(
typeEffect,
800
);



}









/* =====================================
   PROFILE IMAGE PARALLAX
===================================== */


const profileImage =
document.querySelector(
".profile-card img"
);



if(profileImage){



window.addEventListener(
"mousemove",
(e)=>{


const x =
(e.clientX /
window.innerWidth - .5)
* 8;



const y =
(e.clientY /
window.innerHeight - .5)
* 8;



profileImage.style.transform =

`
translate(${x}px, ${y}px)
`;



}

);



}








/* =====================================
   CARD HOVER EFFECT
===================================== */


const cards =
document.querySelectorAll(
".skill-card, .project-card, .achievement-card, .cert-card, .education-grid div"
);



cards.forEach(card=>{


card.addEventListener(
"mouseenter",
()=>{


card.style.transform =
"translateY(-8px)";



card.style.transition =
".3s ease";



});




card.addEventListener(
"mouseleave",
()=>{


card.style.transform =
"translateY(0)";


});


});









/* =====================================
   CURRENT YEAR FOOTER
===================================== */


const footer =
document.querySelector("footer");



if(footer){


const year =
new Date().getFullYear();



footer.innerHTML +=

`
<br>
© ${year} Sapna Sharma
`;



}



});
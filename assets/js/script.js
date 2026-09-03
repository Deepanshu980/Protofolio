$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section[id]').each(function () {
            let height = $(this).outerHeight();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling for same-page anchors only
    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (!href || href === '#') return;
        const target = $(href);
        if (!target.length) return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top,
        }, 500, 'linear');
    });

    $("#contact-form").submit(function (event) {
        event.preventDefault();

        emailjs.init("5t_R7UDRKXwEd7bwd");

        emailjs.sendForm(
            "service_vtdwdzo",
            "template_x00b7md",
            "#contact-form"
        )
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById("contact-form").reset();
            alert("Form Submitted Successfully");
        })
        .catch(function (error) {
            console.log("FAILED...", error);
            alert("Form Submission Failed! Try Again");
        });
    });

});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Deepanshu Thakur";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

var typed = new Typed(".typing-text", {
    strings: ["AI Development", "Backend Development", "Machine Learning", "Data Science"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

async function fetchData(type = "skills") {
    const response = type === "skills"
        ? await fetch("skills.json")
        : await fetch("./projects/projects.json");
    return response.json();
}

function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
              </div>
            </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 6).forEach(project => {
        const viewLink = project.links.view && project.links.view !== "#"
            ? project.links.view
            : project.links.code;
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${viewLink}" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });

    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.work .box', { interval: 200 });
}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h2', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .instagram', { interval: 600 });

srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

srtop.reveal('.education .box', { interval: 200 });

srtop.reveal('.work .box', { interval: 200 });

srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

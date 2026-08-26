/* =========================================================
   EKO ANALYTICS & RESEARCH
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
   ========================================================= */

const SUPABASE_URL =
    "https://cueajmzcmawvcbpwuyhi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_hUjTnuPCkxB2ysGoYZq0Mg_uhymAbhb";

let supabaseClient = null;

if (window.supabase) {

    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

}


/* =========================================================
   STORAGE CONFIGURATION
   ========================================================= */

const EKO_BUCKET = "eko";

const PROJECT_01_FOLDER = "project-01";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initialiseNavigation();

    initialiseYear();

    initialiseScrollEffects();

    initialiseBackToTop();

    initialiseProjectFilters();

    initialiseFAQ();

    initialiseContactForm();

    initialiseAdmin();

    initialiseProject01();

});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initialiseNavigation() {

    const navToggle =
        document.getElementById("navToggle");

    const navLinks =
        document.getElementById("navLinks");

    if (!navToggle || !navLinks) {
        return;
    }


    navToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const icon =
            navToggle.querySelector("i");

        if (icon) {

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });


    navLinks.querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                const icon =
                    navToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });


    document.addEventListener("click", function (event) {

        if (
            !navLinks.contains(event.target) &&
            !navToggle.contains(event.target)
        ) {

            navLinks.classList.remove("active");

            const icon =
                navToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initialiseYear() {

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   NAVIGATION SCROLL EFFECT
   ========================================================= */

function initialiseScrollEffects() {

    const navigation =
        document.querySelector(".site-nav");

    if (!navigation) {
        return;
    }


    function updateNavigation() {

        if (window.scrollY > 30) {

            navigation.classList.add("scrolled");

        } else {

            navigation.classList.remove("scrolled");

        }

    }


    updateNavigation();

    window.addEventListener(
        "scroll",
        updateNavigation,
        { passive: true }
    );

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initialiseBackToTop() {

    let button =
        document.getElementById("backToTop");


    if (!button) {

        button =
            document.createElement("button");

        button.id =
            "backToTop";

        button.className =
            "back-to-top";

        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        button.innerHTML =
            '<i class="fas fa-arrow-up"></i>';

        document.body.appendChild(button);

    }


    function updateButton() {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        }
    );


    updateButton();

}


/* =========================================================
   PROJECT FILTERING
   ========================================================= */

function initialiseProjectFilters() {

    const filterButtons =
        document.querySelectorAll(
            "[data-project-filter]"
        );

    const projectCards =
        document.querySelectorAll(
            "[data-project-category]"
        );


    if (
        filterButtons.length === 0 ||
        projectCards.length === 0
    ) {
        return;
    }


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const filter =
                        button.dataset.projectFilter;

                    filterButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );

                    button.classList.add(
                        "active"
                    );


                    projectCards.forEach(
                        function (card) {

                            const category =
                                card.dataset.projectCategory;

                            if (
                                filter === "all" ||
                                category === filter
                            ) {

                                card.style.display =
                                    "";

                            } else {

                                card.style.display =
                                    "none";

                            }

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   FAQ
   ========================================================= */

function initialiseFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );


    if (questions.length === 0) {
        return;
    }


    questions.forEach(
        function (question) {

            question.addEventListener(
                "click",
                function () {

                    const item =
                        question.closest(
                            ".faq-item"
                        );

                    if (!item) {
                        return;
                    }


                    const currentlyOpen =
                        item.classList.contains(
                            "active"
                        );


                    document.querySelectorAll(
                        ".faq-item"
                    )
                    .forEach(
                        function (faq) {

                            faq.classList.remove(
                                "active"
                            );

                        }
                    );


                    if (!currentlyOpen) {

                        item.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initialiseContactForm() {

    const form =
        document.getElementById(
            "consultationForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                getInputValue("clientName");

            const email =
                getInputValue("clientEmail");

            const organisation =
                getInputValue("organisation");

            const service =
                getInputValue("service");

            const message =
                getInputValue("projectMessage");


            if (
                !name ||
                !email ||
                !message
            ) {

                showFormMessage(
                    "Please complete your name, email and project description.",
                    "error"
                );

                return;

            }


            if (!isValidEmail(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            const subject =
                encodeURIComponent(
                    "EKO Analytics & Research Consultation Request"
                );


            const body =
                encodeURIComponent(

                    "Name: " +
                    name +

                    "\n\nEmail: " +
                    email +

                    "\n\nOrganisation: " +
                    (
                        organisation ||
                        "Not provided"
                    ) +

                    "\n\nService required: " +
                    (
                        service ||
                        "Not specified"
                    ) +

                    "\n\nProject / enquiry:\n" +
                    message

                );


            const mailto =
                "mailto:edwinokello24@gmail.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;


            showFormMessage(
                "Your email application will now open with your enquiry prepared.",
                "success"
            );


            window.location.href =
                mailto;

        }
    );

}


/* =========================================================
   FORM HELPERS
   ========================================================= */

function getInputValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();

}


function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


function showFormMessage(
    message,
    type
) {

    const box =
        document.getElementById(
            "formMessage"
        );

    if (!box) {
        return;
    }


    box.textContent =
        message;

    box.className =
        "form-message show " +
        type;

}


/* =========================================================
   PROJECT 01
   ========================================================= */

function initialiseProject01() {

    const projectContainer =
        document.getElementById(
            "project01Files"
        );

    if (!projectContainer) {
        return;
    }


    loadProject01Files();

}


/* =========================================================
   LOAD PROJECT 01 FILES
   ========================================================= */

async function loadProject01Files() {

    const container =
        document.getElementById(
            "project01Files"
        );

    if (!container) {
        return;
    }


    if (!supabaseClient) {

        showProjectError(
            container,
            "Project storage is currently unavailable."
        );

        return;

    }


    container.innerHTML = `

        <div class="file-loading">

            <i class="fas fa-spinner fa-spin"></i>

            <strong>
                Loading Project 01 resources...
            </strong>

        </div>

    `;


    try {

        const { data, error } =
            await supabaseClient.storage
            .from(EKO_BUCKET)
            .list(
                PROJECT_01_FOLDER,
                {

                    limit: 100,

                    sortBy: {

                        column: "name",
                        order: "asc"

                    }

                }
            );


        if (error) {

            console.error(
                "Project 01 storage error:",
                error
            );

            showProjectError(
                container,
                "Project resources could not be loaded."
            );

            return;

        }


        const files =
            (data || [])
            .filter(
                function (file) {

                    return (
                        file.name &&
                        file.name !== ".emptyFolderPlaceholder"
                    );

                }
            );


        displayProject01Files(
            container,
            files
        );

    } catch (error) {

        console.error(
            "Project 01 error:",
            error
        );


        showProjectError(
            container,
            "Project resources could not be loaded."
        );

    }

}


/* =========================================================
   DISPLAY PROJECT 01 FILES
   ========================================================= */

function displayProject01Files(
    container,
    files
) {

    container.innerHTML = "";


    if (
        !files ||
        files.length === 0
    ) {

        container.innerHTML = `

            <div class="project-file-empty">

                <i class="fas fa-folder-open"></i>

                <h3>
                    Project resources coming soon
                </h3>

                <p>
                    Supporting reports, datasets and analytical
                    files for Project 01 will be published here.
                </p>

            </div>

        `;

        return;

    }


    files.forEach(
        function (file) {

            const path =
                PROJECT_01_FOLDER +
                "/" +
                file.name;


            const { data } =
                supabaseClient.storage
                .from(EKO_BUCKET)
                .getPublicUrl(path);


            if (
                !data ||
                !data.publicUrl
            ) {
                return;
            }


            const publicUrl =
                data.publicUrl;


            const extension =
                getFileExtension(
                    file.name
                );


            const icon =
                getDocumentIcon(
                    extension
                );


            const title =
                cleanDocumentTitle(
                    file.name
                );


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "project-file-card";


            card.innerHTML = `

                <div class="project-file-icon">

                    <i class="fas ${icon}"></i>

                </div>


                <div class="project-file-info">

                    <span class="file-type">
                        ${escapeHTML(
                            extension.toUpperCase()
                        )}
                    </span>

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                    <p>
                        Supporting resource for
                        Project 01: SME Sales &amp;
                        Customer Performance Analysis.
                    </p>

                </div>


                <div class="project-file-actions">

                    <a
                        href="${escapeAttribute(publicUrl)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="file-view"
                    >

                        <i class="fas fa-eye"></i>
                        View

                    </a>


                    <a
                        href="${escapeAttribute(publicUrl)}"
                        download
                        class="file-download"
                    >

                        <i class="fas fa-download"></i>
                        Download

                    </a>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   PROJECT ERROR
   ========================================================= */

function showProjectError(
    container,
    message
) {

    container.innerHTML = `

        <div class="project-file-empty">

            <i class="fas fa-circle-exclamation"></i>

            <h3>
                Resources unavailable
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>

    `;

}


/* =========================================================
   DOCUMENT HELPERS
   ========================================================= */

function getFileExtension(
    fileName
) {

    const parts =
        fileName.split(".");

    if (parts.length < 2) {
        return "file";
    }

    return parts
        .pop()
        .toLowerCase();

}


function getDocumentIcon(
    extension
) {

    switch (extension) {

        case "pdf":

            return "fa-file-pdf";


        case "xlsx":
        case "xls":
        case "csv":

            return "fa-file-excel";


        case "doc":
        case "docx":

            return "fa-file-word";


        case "ppt":
        case "pptx":

            return "fa-file-powerpoint";


        case "jpg":
        case "jpeg":
        case "png":
        case "webp":

            return "fa-file-image";


        default:

            return "fa-file-lines";

    }

}


function cleanDocumentTitle(
    fileName
) {

    return fileName

        .replace(/\.[^/.]+$/, "")

        .replace(/[-_]+/g, " ")

        .replace(/\s+/g, " ")

        .trim();

}


/* =========================================================
   ADMIN INITIALISATION
   ========================================================= */

function initialiseAdmin() {

    const loginForm =
        document.getElementById(
            "adminLoginForm"
        );


    const logoutButton =
        document.getElementById(
            "adminLogout"
        );


    const uploadForm =
        document.getElementById(
            "projectUploadForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                adminLogin();

            }
        );

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            adminLogout
        );

    }


    if (uploadForm) {

        uploadForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                uploadProject01Files();

            }
        );

    }


    if (
        loginForm ||
        logoutButton ||
        uploadForm
    ) {

        checkAdminSession();

    }

}


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

async function adminLogin() {

    if (!supabaseClient) {

        showAdminMessage(
            "Supabase connection is unavailable.",
            "error"
        );

        return;

    }


    const email =
        getInputValue(
            "adminEmail"
        );


    const passwordElement =
        document.getElementById(
            "adminPassword"
        );


    const password =
        passwordElement
            ? passwordElement.value
            : "";


    if (
        !email ||
        !password
    ) {

        showAdminMessage(
            "Enter your administrator email and password.",
            "error"
        );

        return;

    }


    showAdminMessage(
        "Signing in...",
        "info"
    );


    const { data, error } =
        await supabaseClient.auth
        .signInWithPassword({

            email: email,
            password: password

        });


    if (error) {

        showAdminMessage(
            error.message,
            "error"
        );

        return;

    }


    if (
        data &&
        data.session
    ) {

        setAdminState(
            true
        );


        showAdminMessage(
            "Administrator access granted.",
            "success"
        );

    }

}


/* =========================================================
   CHECK ADMIN SESSION
   ========================================================= */

async function checkAdminSession() {

    if (!supabaseClient) {
        return;
    }


    const { data } =
        await supabaseClient.auth
        .getSession();


    const signedIn =
        Boolean(
            data &&
            data.session
        );


    setAdminState(
        signedIn
    );

}


/* =========================================================
   SET ADMIN STATE
   ========================================================= */

function setAdminState(
    signedIn
) {

    const loginArea =
        document.getElementById(
            "adminLoginArea"
        );


    const dashboard =
        document.getElementById(
            "adminDashboard"
        );


    if (loginArea) {

        loginArea.style.display =
            signedIn
                ? "none"
                : "";

    }


    if (dashboard) {

        dashboard.style.display =
            signedIn
                ? ""
                : "none";

    }

}


/* =========================================================
   ADMIN LOGOUT
   ========================================================= */

async function adminLogout() {

    if (!supabaseClient) {
        return;
    }


    await supabaseClient.auth
        .signOut();


    setAdminState(
        false
    );


    showAdminMessage(
        "You have been signed out.",
        "success"
    );

}


/* =========================================================
   ADMIN MESSAGE
   ========================================================= */

function showAdminMessage(
    message,
    type
) {

    const box =
        document.getElementById(
            "adminMessage"
        );


    if (!box) {
        return;
    }


    box.textContent =
        message;


    box.className =
        "admin-message show " +
        type;

}


/* =========================================================
   UPLOAD PROJECT 01 FILES
   ========================================================= */

async function uploadProject01Files() {

    if (!supabaseClient) {

        showAdminMessage(
            "Supabase connection is unavailable.",
           

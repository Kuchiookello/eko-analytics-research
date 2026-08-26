/* =========================================================
   EKO ANALYTICS & RESEARCH
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://cueajmzcmawvcbpwuyhi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_hUjTnuPCkxB2ysGoYZq0Mg_uhymAbhb";

const EKO_BUCKET =
    "eko";

const PROJECT_01_FOLDER =
    "project-01";


let supabaseClient = null;


if (
    window.supabase &&
    window.supabase.createClient
) {

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );

}


/* =========================================================
   START WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initialiseYear();

        initialiseNavigation();

        initialiseBackToTop();

        initialiseContactForm();

        initialiseProject01Files();

        initialiseAdministrator();

    }
);


/* =========================================================
   COPYRIGHT YEAR
========================================================= */

function initialiseYear() {

    document
        .querySelectorAll("#year")
        .forEach(
            function (year) {

                year.textContent =
                    new Date().getFullYear();

            }
        );

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initialiseNavigation() {

    const toggle =
        document.getElementById(
            "navToggle"
        );


    const links =
        document.getElementById(
            "navLinks"
        );


    if (
        !toggle ||
        !links
    ) {

        return;

    }


    /* -----------------------------
       OPEN / CLOSE MENU
    ----------------------------- */

    toggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                links.classList.toggle(
                    "active"
                );


            toggle.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );


            const icon =
                toggle.querySelector("i");


            if (icon) {

                if (isOpen) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    /* -----------------------------
       CLOSE WHEN LINK CLICKED
    ----------------------------- */

    links
        .querySelectorAll("a")
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeNavigationMenu(
                            toggle,
                            links
                        );

                    }
                );

            }
        );


    /* -----------------------------
       CLICK OUTSIDE
    ----------------------------- */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !links.contains(
                    event.target
                ) &&
                !toggle.contains(
                    event.target
                )
            ) {

                closeNavigationMenu(
                    toggle,
                    links
                );

            }

        }
    );


    /* -----------------------------
       ESC KEY
    ----------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeNavigationMenu(
                    toggle,
                    links
                );

            }

        }
    );


    /* -----------------------------
       CLOSE ON LARGE SCREEN
    ----------------------------- */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >
                980
            ) {

                closeNavigationMenu(
                    toggle,
                    links
                );

            }

        }
    );

}


function closeNavigationMenu(
    toggle,
    links
) {

    links.classList.remove(
        "active"
    );


    links.classList.remove(
        "open"
    );


    toggle.setAttribute(
        "aria-expanded",
        "false"
    );


    const icon =
        toggle.querySelector("i");


    if (icon) {

        icon.classList.remove(
            "fa-xmark"
        );

        icon.classList.add(
            "fa-bars"
        );

    }

}


/* =========================================================
   RETURN TO TOP BUTTON
========================================================= */

function initialiseBackToTop() {

    let button =
        document.getElementById(
            "backToTop"
        );


    /*
       Automatically create it
       if a page doesn't contain it.
    */

    if (!button) {

        button =
            document.createElement(
                "button"
            );


        button.id =
            "backToTop";


        button.className =
            "back-to-top";


        button.title =
            "Return to top";


        button.setAttribute(
            "aria-label",
            "Return to top"
        );


        button.innerHTML = `

            <i class="fas fa-arrow-up"></i>

        `;


        document.body.appendChild(
            button
        );

    }


    function updateBackToTop() {

        if (
            window.scrollY >
            450
        ) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        }
    );


    updateBackToTop();

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
                getValue(
                    "clientName"
                );


            const email =
                getValue(
                    "clientEmail"
                );


            const organisation =
                getValue(
                    "organisation"
                );


            const service =
                getValue(
                    "service"
                );


            const project =
                getValue(
                    "projectMessage"
                );


            if (
                !name ||
                !email ||
                !project
            ) {

                showFormMessage(

                    "Please complete your name, email and project details.",

                    "error"

                );

                return;

            }


            if (
                !validateEmail(email)
            ) {

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

                    "EKO ANALYTICS & RESEARCH" +

                    "\n\nConsultation Request" +

                    "\n\nName: " +
                    name +

                    "\nEmail: " +
                    email +

                    "\nOrganisation: " +
                    (
                        organisation ||
                        "Not provided"
                    ) +

                    "\nArea of Support: " +
                    (
                        service ||
                        "Not specified"
                    ) +

                    "\n\nProject / Enquiry Details:" +

                    "\n" +
                    project

                );


            showFormMessage(

                "Your email application is being opened with your enquiry prepared.",

                "success"

            );


            window.location.href =

                "mailto:edwinokello24@gmail.com" +

                "?subject=" +
                subject +

                "&body=" +
                body;

        }
    );

}


/* =========================================================
   FORM HELPERS
========================================================= */

function getValue(id) {

    const field =
        document.getElementById(id);


    if (!field) {

        return "";

    }


    return field.value.trim();

}


function validateEmail(email) {

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
   PROJECT 01 PUBLIC FILES
========================================================= */

function initialiseProject01Files() {

    const container =
        document.getElementById(
            "project01Files"
        );


    if (!container) {

        return;

    }


    loadProject01Files();

}


async function loadProject01Files() {

    const container =
        document.getElementById(
            "project01Files"
        );


    if (!container) {

        return;

    }


    if (!supabaseClient) {

        displayProjectMessage(

            container,

            "Project storage connection is unavailable."

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

        const {
            data,
            error
        } =
            await supabaseClient
                .storage

                .from(
                    EKO_BUCKET
                )

                .list(
                    PROJECT_01_FOLDER,
                    {

                        limit:
                            100,

                        sortBy: {

                            column:
                                "name",

                            order:
                                "asc"

                        }

                    }
                );


        if (error) {

            console.error(
                error
            );


            displayProjectMessage(

                container,

                "Project resources are not available yet."

            );

            return;

        }


        const files =
            (data || [])
                .filter(
                    function (file) {

                        return (
                            file.name &&
                            file.name !==
                            ".emptyFolderPlaceholder"
                        );

                    }
                );


        displayProjectFiles(
            container,
            files
        );

    }

    catch (error) {

        console.error(
            error
        );


        displayProjectMessage(

            container,

            "Project resources could not be loaded."

        );

    }

}


/* =========================================================
   DISPLAY PROJECT FILES
========================================================= */

function displayProjectFiles(
    container,
    files
) {

    container.innerHTML =
        "";


    if (
        !files ||
        files.length === 0
    ) {

        displayProjectMessage(

            container,

            "Supporting Project 01 files will appear here once uploaded."

        );

        return;

    }


    files.forEach(
        function (file) {

            const path =

                PROJECT_01_FOLDER +

                "/" +

                file.name;


            const {
                data
            } =

                supabaseClient
                    .storage

                    .from(
                        EKO_BUCKET
                    )

                    .getPublicUrl(
                        path
                    );


            if (
                !data ||
                !data.publicUrl
            ) {

                return;

            }


            const extension =
                getExtension(
                    file.name
                );


            const icon =
                fileIcon(
                    extension
                );


            const title =
                cleanFileTitle(
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

                        ${escapeHTML(
                            title
                        )}

                    </h3>


                    <p>

                        Supporting resource for
                        Project 01.

                    </p>

                </div>


                <div class="project-file-actions">

                    <a
                        class="file-view"

                        href="${escapeAttribute(
                            data.publicUrl
                        )}"

                        target="_blank"

                        rel="noopener noreferrer"
                    >

                        <i class="fas fa-eye"></i>

                        View

                    </a>


                    <a
                        class="file-download"

                        href="${escapeAttribute(
                            data.publicUrl
                        )}"

                        download
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


function displayProjectMessage(
    container,
    message
) {

    container.innerHTML = `

        <div class="project-file-empty">

            <i class="fas fa-folder-open"></i>

            <h3>
                Project Resources
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>

    `;

}


/* =========================================================
   ADMINISTRATOR
========================================================= */

function initialiseAdministrator() {

    const loginForm =
        document.getElementById(
            "adminLoginForm"
        );


    const logout =
        document.getElementById(
            "adminLogout"
        );


    const uploadForm =
        document.getElementById(
            "projectUploadForm"
        );


    /*
       If this isn't admin.html,
       stop here.
    */

    if (
        !loginForm &&
        !logout &&
        !uploadForm
    ) {

        return;

    }


    checkAdministratorSession();


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                administratorLogin();

            }
        );

    }


    if (logout) {

        logout.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                administratorLogout();

            }
        );

    }


    if (uploadForm) {

        uploadForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                uploadProjectFiles();

            }
        );

    }

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

async function administratorLogin() {

    if (!supabaseClient) {

        showAdminMessage(

            "Supabase could not be loaded.",

            "error"

        );

        return;

    }


    const email =
        getValue(
            "adminEmail"
        );


    const passwordField =
        document.getElementById(
            "adminPassword"
        );


    const password =
        passwordField
            ? passwordField.value
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


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .auth

                .signInWithPassword(
                    {

                        email:
                            email,

                        password:
                            password

                    }
                );


        if (error) {

            console.error(
                "Login error:",
                error
            );


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

            setAdministratorState(
                true
            );


            showAdminMessage(

                "Administrator access granted.",

                "success"

            );

        } else {

            showAdminMessage(

                "Login did not create a valid session.",

                "error"

            );

        }

    }

    catch (error) {

        console.error(
            error
        );


        showAdminMessage(

            "Unable to complete login. Please try again.",

            "error"

        );

    }

}


/* =========================================================
   CHECK ADMIN SESSION
========================================================= */

async function checkAdministratorSession() {

    if (!supabaseClient) {

        return;

    }


    try {

        const {
            data
        } =
            await supabaseClient
                .auth

                .getSession();


        setAdministratorState(

            Boolean(
                data &&
                data.session
            )

        );

    }

    catch (error) {

        console.error(
            error
        );

    }

}


/* =========================================================
   SET ADMIN PAGE STATE
========================================================= */

function setAdministratorState(
    loggedIn
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

            loggedIn
                ? "none"
                : "";

    }


    if (dashboard) {

        dashboard.style.display =

            loggedIn
                ? ""
                : "none";

    }

}


/* =========================================================
   LOG OUT
========================================================= */

async function administratorLogout() {

    if (!supabaseClient) {

        return;

    }


    try {

        await supabaseClient
            .auth
            .signOut();


        setAdministratorState(
            false
        );


        const email =
            document.getElementById(
                "adminEmail"
            );


        const password =
            document.getElementById(
                "adminPassword"
            );


        if (email) {

            email.value =
                "";

        }


        if (password) {

            password.value =
                "";

        }


        showAdminMessage(

            "You have been signed out.",

            "success"

        );

    }

    catch (error) {

        showAdminMessage(

            "Unable to sign out.",

            "error"

        );

    }

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
   UPLOAD PROJECT 01
========================================================= */

async function uploadProjectFiles() {

    if (!supabaseClient) {

        showAdminMessage(

            "Supabase connection is unavailable.",

            "error"

        );

        return;

    }


    const input =
        document.getElementById(
            "projectFiles"
        );


    if (
        !input ||
        !input.files ||
        input.files.length === 0
    ) {

        showAdminMessage(

            "Select at least one file.",

            "error"

        );

        return;

    }


    const {
        data: sessionData
    } =
        await supabaseClient
            .auth

            .getSession();


    if (
        !sessionData ||
        !sessionData.session
    ) {

        showAdminMessage(

            "Your administrator session has expired. Please sign in again.",

            "error"

        );


        setAdministratorState(
            false
        );

        return;

    }


    showAdminMessage(

        "Uploading files...",

        "info"

    );


    let successful =
        0;


    let failed =
        0;


    for (
        const file
        of input.files
    ) {

        const safeName =
            createSafeFileName(
                file.name
            );


        const path =

            PROJECT_01_FOLDER +

            "/" +

            safeName;


        const {
            error
        } =
            await supabaseClient
                .storage

                .from(
                    EKO_BUCKET
                )

                .upload(
                    path,
                    file,
                    {

                        upsert:
                            true,

                        contentType:

                            file.type ||

                            "application/octet-stream"

                    }
                );


        if (error) {

            console.error(
                file.name,
                error
            );


            failed++;

        } else {

            successful++;

        }

    }


    input.value =
        "";


    if (
        successful > 0 &&
        failed === 0
    ) {

        showAdminMessage(

            successful +
            " file(s) uploaded successfully.",

            "success"

        );

    } else if (
        successful > 0
    ) {

        showAdminMessage(

            successful +
            " uploaded; " +
            failed +
            " failed.",

            "info"

        );

    } else {

        showAdminMessage(

            "Upload failed. Your Supabase Storage policy may need to be checked.",

            "error"

        );

    }

}


/* =========================================================
   FILE HELPERS
========================================================= */

function getExtension(
    fileName
) {

    const position =
        fileName.lastIndexOf(".");


    if (
        position === -1
    ) {

        return "file";

    }


    return fileName
        .substring(
            position + 1
        )
        .toLowerCase();

}


function fileIcon(
    extension
) {

    if (
        extension === "pdf"
    ) {

        return "fa-file-pdf";

    }


    if (
        [
            "xls",
            "xlsx",
            "csv"
        ].includes(
            extension
        )
    ) {

        return "fa-file-excel";

    }


    if (
        [
            "doc",
            "docx"
        ].includes(
            extension
        )
    ) {

        return "fa-file-word";

    }


    if (
        [
            "ppt",
            "pptx"
        ].includes(
            extension
        )
    ) {

        return "fa-file-powerpoint";

    }


    if (
        [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ].includes(
            extension
        )
    ) {

        return "fa-file-image";

    }


    return "fa-file-lines";

}


function cleanFileTitle(
    fileName
) {

    return fileName

        .replace(
            /\.[^/.]+$/,
            ""
        )

        .replace(
            /[-_]+/g,
            " "
        )

        .replace(
            /\s+/g,
            " "
        )

        .trim();

}


function createSafeFileName(
    fileName
) {

    const finalDot =
        fileName.lastIndexOf(".");


    let name =
        finalDot >= 0

            ? fileName.substring(
                0,
                finalDot
            )

            : fileName;


    const extension =
        finalDot >= 0

            ? fileName.substring(
                finalDot
            )

            : "";


    name =
        name

            .trim()

            .replace(
                /[^a-zA-Z0-9-_]+/g,
                "-"
            )

            .replace(
                /-+/g,
                "-"
            )

            .replace(
                /^-|-$/g,
                ""
            );


    if (!name) {

        name =
            "eko-file";

    }


    return (
        name +
        extension.toLowerCase()
    );

}


/* =========================================================
   SECURITY / OUTPUT HELPERS
========================================================= */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}


function escapeAttribute(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        );

}

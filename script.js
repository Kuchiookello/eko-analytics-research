/* =========================================================
   EKO ANALYTICS & RESEARCH
   COMPLETE SHARED WEBSITE JAVASCRIPT

   Supports:
   - Navigation
   - Mobile menu
   - Navigation scroll state
   - Back to top
   - Footer year
   - Contact consultation form
   - Supabase public project resources
   - Projects 01–07
   - Actual uploaded filenames
   - Office document viewing
   - Direct PDF/image viewing
   - Reliable downloads
========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

const SUPABASE_URL =
    "https://cueajmzcmawvcbpwuyhi.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_hUjTnuPCkxB2ysGoYZq0Mg_uhymAbhb";


const EKO_BUCKET =
    "eko";


let supabaseClient =
    null;


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
   PROJECT DEFINITIONS
========================================================= */

const EKO_PROJECTS = {

    "project-01": {
        number: "01",
        title: "SME Sales & Customer Performance Analysis",
        folder: "project-01"
    },

    "project-02": {
        number: "02",
        title: "Customer Satisfaction & Service Quality Analysis",
        folder: "project-02"
    },

    "project-03": {
        number: "03",
        title: "Youth Empowerment Programme M&E Dashboard",
        folder: "project-03"
    },

    "project-04": {
        number: "04",
        title: "Consumer Purchasing Behaviour & Market Opportunity Study",
        folder: "project-04"
    },

    "project-05": {
        number: "05",
        title: "Youth Employment & Skills Development Analysis",
        folder: "project-05"
    },

    "project-06": {
        number: "06",
        title: "NGO Programme Performance Review",
        folder: "project-06"
    },

    "project-07": {
        number: "07",
        title: "SME Business Performance Dashboard",
        folder: "project-07"
    }

};


/* =========================================================
   START WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initialiseYear();

        initialiseNavigation();

        initialiseNavigationScrollState();

        initialiseBackToTop();

        initialiseContactForm();

        initialisePublicProjectFiles();

        initialiseDownloadLinks();

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


    toggle.setAttribute(
        "aria-expanded",
        "false"
    );


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


            updateNavigationIcon(
                toggle,
                isOpen
            );

        }
    );


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


/* =========================================================
   NAVIGATION ICON
========================================================= */

function updateNavigationIcon(
    toggle,
    isOpen
) {

    const icon =
        toggle.querySelector("i");


    if (!icon) {

        return;

    }


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


/* =========================================================
   CLOSE NAVIGATION
========================================================= */

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


    updateNavigationIcon(
        toggle,
        false
    );

}


/* =========================================================
   NAVIGATION SCROLL EFFECT
========================================================= */

function initialiseNavigationScrollState() {

    const nav =
        document.querySelector(
            ".site-nav"
        );


    if (!nav) {

        return;

    }


    function updateNavigationState() {

        if (
            window.scrollY >
            25
        ) {

            nav.classList.add(
                "scrolled"
            );

        } else {

            nav.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavigationState,
        {
            passive: true
        }
    );


    updateNavigationState();

}


/* =========================================================
   RETURN TO TOP
========================================================= */

function initialiseBackToTop() {

    let button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {

        button =
            document.createElement(
                "button"
            );


        button.id =
            "backToTop";


        button.className =
            "back-to-top";


        button.type =
            "button";


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


    if (
        form.dataset.ekoInitialised ===
        "true"
    ) {

        return;

    }


    form.dataset.ekoInitialised =
        "true";


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            event.stopImmediatePropagation();


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


            const phone =
                getValue(
                    "clientPhone"
                );


            const service =
                getValue(
                    "service"
                );


            const timeframe =
                getValue(
                    "timeframe"
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
                !validateEmail(
                    email
                )
            ) {

                showFormMessage(

                    "Please enter a valid email address.",

                    "error"

                );

                return;

            }


            const subjectText =
                service
                    ? "EKO Consultation Enquiry — " +
                      service
                    : "EKO Consultation Enquiry";


            const emailBody =

`Dear EKO Analytics & Research,

I would like to enquire about a possible research or analytical assignment.

Name: ${name}
Organisation: ${organisation || "Not provided"}
Email: ${email}
Phone / WhatsApp: ${phone || "Not provided"}
Area of Support: ${service || "Not yet determined"}
Preferred Timeframe: ${timeframe || "Not yet determined"}

Project / Enquiry Details:

${project}

Kind regards,
${name}`;


            const subject =
                encodeURIComponent(
                    subjectText
                );


            const body =
                encodeURIComponent(
                    emailBody
                );


            showFormMessage(

                "Your enquiry is ready. Your email application should open automatically.",

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

function getValue(
    id
) {

    const field =
        document.getElementById(
            id
        );


    if (!field) {

        return "";

    }


    return String(
        field.value || ""
    ).trim();

}


function validateEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );

}


/* =========================================================
   FORM MESSAGE
========================================================= */

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
   PUBLIC PROJECT FILE SYSTEM
========================================================= */

function initialisePublicProjectFiles() {

    const containers =
        findProjectFileContainers();


    if (
        containers.length ===
        0
    ) {

        return;

    }


    containers.forEach(
        function (item) {

            loadPublicProjectFiles(
                item.container,
                item.projectKey
            );

        }
    );

}


/* =========================================================
   FIND PROJECT FILE CONTAINERS
========================================================= */

function findProjectFileContainers() {

    const results =
        [];


    const used =
        new Set();


    document
        .querySelectorAll(
            "[data-project-files]"
        )
        .forEach(
            function (container) {

                const projectKey =
                    container.dataset.project;


                if (
                    EKO_PROJECTS[
                        projectKey
                    ] &&
                    !used.has(
                        container
                    )
                ) {

                    used.add(
                        container
                    );


                    results.push({

                        container:
                            container,

                        projectKey:
                            projectKey

                    });

                }

            }
        );


    for (
        let number = 1;
        number <= 7;
        number++
    ) {

        const padded =
            String(number)
            .padStart(
                2,
                "0"
            );


        const projectKey =
            "project-" +
            padded;


        const container =
            document.getElementById(
                "project" +
                padded +
                "Files"
            );


        if (
            container &&
            EKO_PROJECTS[
                projectKey
            ] &&
            !used.has(
                container
            )
        ) {

            used.add(
                container
            );


            results.push({

                container:
                    container,

                projectKey:
                    projectKey

            });

        }

    }


    return results;

}


/* =========================================================
   LOAD PUBLIC PROJECT FILES
========================================================= */

async function loadPublicProjectFiles(
    container,
    projectKey
) {

    const project =
        EKO_PROJECTS[
            projectKey
        ];


    if (
        !container ||
        !project
    ) {

        return;

    }


    if (!supabaseClient) {

        displayProjectError(

            container,

            "Project storage is currently unavailable."

        );

        return;

    }


    container.innerHTML = `

        <div class="file-loading">

            <i class="fas fa-spinner fa-spin"></i>

            <strong>
                Loading Project ${escapeHTML(project.number)} resources...
            </strong>

            <p>
                Connecting to EKO project storage.
            </p>

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
                project.folder,
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
                "Project listing error:",
                projectKey,
                error
            );


            displayProjectError(

                container,

                "Unable to load project resources."

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


        if (
            files.length ===
            0
        ) {

            displayProjectEmpty(
                container,
                project
            );

            return;

        }


        displayUploadedProjectFiles(
            container,
            projectKey,
            files
        );

    }

    catch (error) {

        console.error(
            "Project file loading failed:",
            projectKey,
            error
        );


        displayProjectError(

            container,

            "Project resources could not be loaded."

        );

    }

}


/* =========================================================
   DISPLAY ACTUAL FILES FOUND IN SUPABASE
========================================================= */

function displayUploadedProjectFiles(
    container,
    projectKey,
    files
) {

    const project =
        EKO_PROJECTS[
            projectKey
        ];


    container.innerHTML =
        "";


    files.forEach(
        function (file) {

            const path =

                project.folder +

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


            const resource =
                identifyProjectResource(
                    projectKey,
                    file.name
                );


            createProjectFileCard(

                container,

                {

                    title:
                        resource.title,

                    description:
                        resource.description,

                    label:
                        resource.label,

                    icon:
                        fileIcon(
                            extension
                        ),

                    url:
                        data.publicUrl,

                    fileName:
                        file.name

                }

            );

        }
    );


    if (
        container.children.length ===
        0
    ) {

        displayProjectError(

            container,

            "No public project files could be displayed."

        );

    }

}


/* =========================================================
   IDENTIFY PROJECT RESOURCE
========================================================= */

function identifyProjectResource(
    projectKey,
    fileName
) {

    const project =
        EKO_PROJECTS[
            projectKey
        ];


    const extension =
        getExtension(
            fileName
        );


    const cleanTitle =
        cleanFileTitle(
            fileName
        );


    let description =
        "Supporting resource for Project " +
        project.number +
        " — " +
        project.title +
        ".";


    let label =
        getFileTypeLabel(
            extension
        );


    if (
        extension ===
        "pdf"
    ) {

        description =
            "Final analytical or research report for Project " +
            project.number +
            ".";

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

        description =
            "Supporting analytical workbook, dataset or dashboard resource for Project " +
            project.number +
            ".";

    }


    if (
        [
            "doc",
            "docx"
        ].includes(
            extension
        )
    ) {

        description =
            "Editable project report or supporting document for Project " +
            project.number +
            ".";

    }


    if (
        [
            "ppt",
            "pptx"
        ].includes(
            extension
        )
    ) {

        description =
            "Presentation resource for Project " +
            project.number +
            ".";

    }


    return {

        title:
            cleanTitle,

        description:
            description,

        label:
            label

    };

}


/* =========================================================
   FILE TYPE LABEL
========================================================= */

function getFileTypeLabel(
    extension
) {

    if (
        extension ===
        "pdf"
    ) {

        return "PDF REPORT";

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

        return "DATA / WORKBOOK";

    }


    if (
        [
            "doc",
            "docx"
        ].includes(
            extension
        )
    ) {

        return "DOCUMENT";

    }


    if (
        [
            "ppt",
            "pptx"
        ].includes(
            extension
        )
    ) {

        return "PRESENTATION";

    }


    if (
        [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif",
            "svg"
        ].includes(
            extension
        )
    ) {

        return "IMAGE";

    }


    return "PROJECT RESOURCE";

}


/* =========================================================
   CREATE PROJECT FILE CARD
========================================================= */

function createProjectFileCard(
    container,
    resource
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "project-file-card";


    const viewUrl =
        createViewUrl(
            resource.fileName,
            resource.url
        );


    card.innerHTML = `

        <div class="project-file-icon">

            <i class="fas ${escapeHTML(resource.icon)}"></i>

        </div>


        <div class="project-file-info">

            <span class="file-type">

                ${escapeHTML(
                    resource.label
                )}

            </span>


            <h3>

                ${escapeHTML(
                    resource.title
                )}

            </h3>


            <p>

                ${escapeHTML(
                    resource.description
                )}

            </p>


            <small class="project-file-name">

                ${escapeHTML(
                    resource.fileName
                )}

            </small>

        </div>


        <div class="project-file-actions">


            <a
                class="file-view"

                href="${escapeAttribute(
                    viewUrl
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
                    resource.url
                )}"

                data-eko-download

                data-file-name="${escapeAttribute(
                    resource.fileName
                )}"
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


/* =========================================================
   CREATE VIEW URL
========================================================= */

function createViewUrl(
    fileName,
    publicUrl
) {

    const extension =
        getExtension(
            fileName
        );


    const directViewTypes = [

        "pdf",
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif",
        "svg",
        "txt"

    ];


    if (
        directViewTypes.includes(
            extension
        )
    ) {

        return publicUrl;

    }


    const officeTypes = [

        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx"

    ];


    if (
        officeTypes.includes(
            extension
        )
    ) {

        return (

            "https://view.officeapps.live.com/op/view.aspx?src=" +

            encodeURIComponent(
                publicUrl
            )

        );

    }


    return publicUrl;

}


/* =========================================================
   PUBLIC DOWNLOAD SYSTEM
========================================================= */

function initialiseDownloadLinks() {

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    "[data-eko-download]"
                );


            if (!link) {

                return;

            }


            const url =
                link.getAttribute(
                    "href"
                );


            const fileName =
                link.dataset.fileName ||
                "eko-resource";


            if (
                !url ||
                url ===
                "#"
            ) {

                return;

            }


            event.preventDefault();


            downloadPublicFile(
                url,
                fileName
            );

        }
    );

}


/* =========================================================
   DOWNLOAD PUBLIC FILE
========================================================= */

async function downloadPublicFile(
    url,
    fileName
) {

    try {

        const response =
            await fetch(
                url
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Unable to retrieve file."
            );

        }


        const blob =
            await response.blob();


        const objectUrl =
            URL.createObjectURL(
                blob
            );


        const anchor =
            document.createElement(
                "a"
            );


        anchor.href =
            objectUrl;


        anchor.download =
            fileName;


        anchor.style.display =
            "none";


        document.body.appendChild(
            anchor
        );


        anchor.click();


        anchor.remove();


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    objectUrl
                );

            },
            1500
        );

    }

    catch (error) {

        console.warn(
            "Direct download failed; opening public URL instead.",
            error
        );


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }

}


/* =========================================================
   PROJECT EMPTY MESSAGE
========================================================= */

function displayProjectEmpty(
    container,
    project
) {

    container.innerHTML = `

        <div class="project-file-empty">

            <i class="fas fa-folder-open"></i>

            <h3>
                Project ${escapeHTML(project.number)} Resources
            </h3>

            <p>
                Public resources for this project
                will appear here once they are uploaded.
            </p>

        </div>

    `;

}


/* =========================================================
   PROJECT ERROR
========================================================= */

function displayProjectError(
    container,
    message
) {

    container.innerHTML = `

        <div class="project-file-empty">

            <i class="fas fa-triangle-exclamation"></i>

            <h3>
                Project Resources
            </h3>

            <p>
                ${escapeHTML(
                    message
                )}
            </p>

        </div>

    `;

}


/* =========================================================
   FILE EXTENSION
========================================================= */

function getExtension(
    fileName
) {

    const position =
        String(fileName)
        .lastIndexOf(".");


    if (
        position ===
        -1
    ) {

        return "file";

    }


    return String(fileName)

        .substring(
            position + 1
        )

        .toLowerCase();

}


/* =========================================================
   FILE ICON
========================================================= */

function fileIcon(
    extension
) {

    if (
        extension ===
        "pdf"
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
            "webp",
            "gif",
            "svg"
        ].includes(
            extension
        )
    ) {

        return "fa-file-image";

    }


    return "fa-file-lines";

}


/* =========================================================
   CLEAN FILE TITLE
========================================================= */

function cleanFileTitle(
    fileName
) {

    return String(fileName)

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


/* =========================================================
   OUTPUT SECURITY
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


/* =========================================================
   ATTRIBUTE SECURITY
========================================================= */

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

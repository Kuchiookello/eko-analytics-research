/* =========================================================
   EKO ANALYTICS & RESEARCH
   COMPLETE WEBSITE JAVASCRIPT
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
   PROJECT 01 DELIVERABLES

   These names match the files created for Project 01
   and uploaded through the EKO administrator.
========================================================= */

const PROJECT_01_FILES = [

    {
        file:
            "EKO_Project_01_SME_Sales_Customer_Performance_Report.pdf",

        title:
            "Final SME Sales & Customer Performance Analysis Report",

        description:
            "The complete professional analytical report containing the executive summary, methodology, findings, interpretation and management recommendations.",

        label:
            "FINAL REPORT",

        icon:
            "fa-file-pdf"
    },


    {
        file:
            "EKO_Project_01_SME_Sales_Customer_Performance.xlsx",

        title:
            "SME Sales & Customer Performance Analytical Workbook",

        description:
            "The supporting Excel workbook containing the synthetic dataset, KPI analysis, dashboard, revenue trends, service analysis and customer performance analysis.",

        label:
            "EXCEL DASHBOARD",

        icon:
            "fa-file-excel"
    },


    {
        file:
            "EKO_Project_01_SME_Sales_Customer_Performance_Report.docx",

        title:
            "Editable Project 01 Analytical Report",

        description:
            "The editable Word version of the Project 01 analytical report.",

        label:
            "WORD REPORT",

        icon:
            "fa-file-word"
    }

];


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
   PROJECT 01 PUBLIC DELIVERABLES
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


/* =========================================================
   LOAD PROJECT 01
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
                Loading Project 01 deliverables...
            </strong>

            <p>
                Connecting to EKO project storage.
            </p>

        </div>

    `;


    /*
       We first try to list the folder.

       If the public Supabase storage policy does not permit
       anonymous folder listing, we automatically fall back
       to the known Project 01 deliverables.
    */

    try {

        const {
            data,
            error
        } =
            await supabaseClient.storage
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


        if (
            !error &&
            data &&
            data.length > 0
        ) {

            const files =
                data.filter(
                    function (file) {

                        return (
                            file.name &&
                            file.name !==
                            ".emptyFolderPlaceholder"
                        );

                    }
                );


            if (
                files.length > 0
            ) {

                displayUploadedProjectFiles(
                    container,
                    files
                );

                return;

            }

        }


        /*
           Anonymous LIST was unavailable or empty.
           Use the known Project 01 deliverables instead.
        */

        displayKnownProject01Files(
            container
        );


    }

    catch (error) {

        console.warn(
            "Folder listing unavailable. Using known Project 01 deliverables.",
            error
        );


        displayKnownProject01Files(
            container
        );

    }

}


/* =========================================================
   DISPLAY KNOWN PROJECT 01 FILES
========================================================= */

function displayKnownProject01Files(
    container
) {

    container.innerHTML =
        "";


    PROJECT_01_FILES.forEach(
        function (resource) {


            const path =

                PROJECT_01_FOLDER +

                "/" +

                resource.file;


            const {
                data
            } =
                supabaseClient.storage
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
                        resource.icon,

                    url:
                        data.publicUrl,

                    fileName:
                        resource.file

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

            "Project files could not be displayed."

        );

    }

}


/* =========================================================
   DISPLAY FILES FOUND THROUGH SUPABASE LIST
========================================================= */

function displayUploadedProjectFiles(
    container,
    files
) {

    container.innerHTML =
        "";


    files.forEach(
        function (file) {


            const path =

                PROJECT_01_FOLDER +

                "/" +

                file.name;


            const {
                data
            } =
                supabaseClient.storage
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
                identifyProject01Resource(
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

}


/* =========================================================
   IDENTIFY PROJECT 01 RESOURCE
========================================================= */

function identifyProject01Resource(
    fileName
) {

    const lower =
        fileName.toLowerCase();


    if (
        lower.endsWith(".pdf")
    ) {

        return {

            title:
                "Final SME Sales & Customer Performance Analysis Report",

            description:
                "The complete EKO analytical report containing the executive summary, methodology, findings, interpretation and management recommendations.",

            label:
                "FINAL REPORT"

        };

    }


    if (
        lower.endsWith(".xlsx") ||
        lower.endsWith(".xls")
    ) {

        return {

            title:
                "SME Sales & Customer Performance Analytical Workbook",

            description:
                "The supporting Excel workbook containing the synthetic dataset, analytical calculations, KPI dashboard and performance charts.",

            label:
                "EXCEL DASHBOARD"

        };

    }


    if (
        lower.endsWith(".docx") ||
        lower.endsWith(".doc")
    ) {

        return {

            title:
                "Editable Project 01 Analytical Report",

            description:
                "Editable Word version of the complete Project 01 analytical report.",

            label:
                "WORD REPORT"

        };

    }


    return {

        title:
            cleanFileTitle(
                fileName
            ),

        description:
            "Supporting resource for Project 01.",

        label:
            "PROJECT RESOURCE"

    };

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
                    resource.url
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

                download="${escapeAttribute(
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
   PROJECT ERROR
========================================================= */

function displayProjectError(
    container,
    message
) {

    container.innerHTML = `

        <div class="project-file-empty">

            <i class="fas fa-folder-open"></i>

            <h3>
                Project Deliverables
            </h3>

            <p>

                ${escapeHTML(message)}

            </p>

        </div>

    `;

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

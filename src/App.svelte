<script>
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";
    import Filter from "./Filter.svelte";
    import Opening from "./Opening.svelte";
    import { getUniqueValues } from "./utils";

    let filtersOpen = false;
    let allOpenings = [];
    let displayedOpenings = [];
    let locationFilters = [];
    let activeLocationFilters = [];
    let regionFilters = [];
    let activeRegionFilters = [];
    let departmentFilters = [];
    let activeDepartmentFilters = [];

    onMount(async () => {
        const response = await fetch(
            "https://ccrt.co/wp-json/wp/v2/posts?categories=31&per_page=100&orderby=title&order=asc"
        );
        const data = await response.json();
        allOpenings = data.map((post) => {
            return {
                title: post.title.rendered,
                id: post.acf.job_id,
                department: post.acf.job_department,
                location: post.acf.job_location,
                region: post.acf.job_region,
                excerpt: post.excerpt.rendered,
                href: post.link,
            };
        });

        // allOpenings = [
        //     {
        //         title: "Freight Specialist",
        //         id: "FY22-2",
        //         department: "Manufacturing",
        //         location: "Pompano Beach, FL",
        //         region: "North America",
        //         excerpt:
        //             "<p>Receive and process all incoming freight packing slips.  Deliver material to proper area.  Package, schedule and ensure all outgoing shipments (both domestic and international) are shipped as scheduled.  Ensure packaging material is ordered to maintain sufficient inventory to meet shipping demands.</p>\n",
        //         href: "https://ccrt.co/job-openings/freight-specialist/",
        //     },
        //     {
        //         title: "Production Specialist",
        //         id: "FY22-1",
        //         department: "Custom Engineering",
        //         location: "Pompano Beach, FL",
        //         region: "North America",
        //         excerpt:
        //             "<p>Responsible for performing rework and repair of Printed Circuit boards per IPC 610 Class II standards.  Must have soldering skills to handle fine pitch parts.  In addition, job requires ability to build custom cables requiring additional soldering skills.  Also must be able to use tools to cut, strip, crimp and install each pin for these custom cables.  Must be able to read cable and board drawings to ensure finished product meets defined specifications.</p>\n",
        //         href: "https://ccrt.co/job-openings/production-specialist/",
        //     },
        //     {
        //         title: "Field Application Engineer",
        //         id: "EU-FY19-3",
        //         department: "Support",
        //         location: "Alling, Germany",
        //         region: "Europe",
        //         excerpt:
        //             "<p>The Field Application Engineer provides comprehensive technical support for customers and sales personnel in a pre-sales and post-sales environment; key technical interface between the Company and its customers; works closely with and supports sales personnel. We are looking for someone who has existing knowledge in the Automotive, Aerospace, and Defense sectors. The ideal candidate would also have knowledge of the real-time market space.</p>\n",
        //         href: "https://ccrt.co/job-openings/field-application-engineer/",
        //     },
        //     {
        //         title: "Technical Support Engineer",
        //         id: "CH-FY20-1",
        //         department: "Support",
        //         location: "Beijing, P.R. China",
        //         region: "Asia",
        //         excerpt:
        //             "<p>The Technical support engineer provides comprehensive technical support for customers and sales personnel in a pre-sales and post-sales environment; key technical interface between the Company and its customers; works closely with and supports sales personnel.</p>\n",
        //         href: "https://ccrt.co/job-openings/technical-support-engineer/",
        //     },
        //     {
        //         title: "Application Engineer",
        //         id: "FY20-8A",
        //         department: "Applications",
        //         location: "Pompano Beach, FL",
        //         region: "North America",
        //         excerpt:
        //             "<p>As an Application Engineer, you will drive design wins for Concurrent Real-Time’s product suite, identify opportunities, support customer evaluations and resolve any product issues that may arise in the customer’s system. The ideal candidate will work closely with the sales team in a pre-sales environment and with the technical support and development teams providing post-sales support to the customer.</p>\n",
        //         href: "https://ccrt.co/job-openings/application-engineer/",
        //     },
        //     {
        //         title: "Sr. Software Engineer",
        //         id: "FY21-4",
        //         department: "Custom Engineering",
        //         location: "Pompano Beach, FL",
        //         region: "North America",
        //         excerpt:
        //             "<p>As a Sr. Software Engineer, you will carry on complex conceptual and innovative design assignments.  You must have the ability to synthesize initial concepts of a project and determine the technical principles involved.  You must also have the ability to communicate current technology in an engineering environment.  As Sr. Software Engineer, you must be technically competent in multiple areas and provide strategic direction and be a strong part of technical committees.</p>\n",
        //         href: "https://ccrt.co/job-openings/sr-software-engineer/",
        //     },
        //     {
        //         title: "Software Engineer",
        //         id: "FY21-7",
        //         department: "RedHawk Linux OS Team",
        //         location: "Pompano Beach, FL",
        //         region: "North America",
        //         excerpt:
        //             "<p>As a Software Engineer, you will be responsible for executing or independently achieving project objectives by performing a variety of very complex engineering and process tasks which require in-depth and diversified technical knowledge.  Duties may pertain to product design and or development, manufacturing, product quality/test, system compatibility and sales/marketing support. The design/development or process design requirement activity is at a level where no previous practice may exist and where only the general nature of the problem is known.</p>\n",
        //         href: "https://ccrt.co/job-openings/software-engineer-2/",
        //     },
        //     {
        //         title: "Software Engineer",
        //         id: "FY21-9",
        //         department: "RedHawk Linux OS Team",
        //         location: "Pompano Beach, FL",
        //         region: "North America",
        //         excerpt:
        //             "<p>As a Software Engineer, you will be responsible for executing or independently achieving project objectives by performing a variety of very complex engineering and process tasks which require in-depth and diversified technical knowledge.  Duties may pertain to product design and or development, manufacturing, product quality/test, system compatibility and sales/marketing support. The design/development or process design requirement activity is at a level where no previous practice may exist and where only the general nature of the problem is known.</p>\n",
        //         href: "https://ccrt.co/job-openings/software-engineer/",
        //     },
        //     {
        //         title: "FPGA Hardware Engineer",
        //         id: "FY21-10",
        //         department: "FPGA Workbench Team",
        //         location: "Pompano Beach, FL",
        //         region: "North America",
        //         excerpt:
        //             "<p>The candidate must have a BSEE or MSEE with a strong FPGA, signal pro ding, and developing cutting edge FPGA algorithms for custom hardware applications. The candidate must be able to research initial concepts and innovate them into mathematical models and implement and test them on our FPGAs. Candidate will have strong RTL coding skills and some knowledge of FPGA architecture: DMA, Memory, RAM/ROM, PLLs, CORDICs, and some knowledge of low-level communication protocols: SPI, I2C, UART, etc. Candidate will be working on a small team developing FPGA algorithms and working directly with a software engineer to control/integrate the algorithm into our systems. We are not looking to sponsor anyone for this position. Applicant must be able to pass a drug screening and background check.</p>\n",
        //         href: "https://ccrt.co/job-openings/fpga-hardware-engineer/",
        //     },
        // ];

        locationFilters = getUniqueValues(allOpenings, "location");
        regionFilters = getUniqueValues(allOpenings, "region");
        departmentFilters = getUniqueValues(allOpenings, "department");
    });

    $: {
        displayedOpenings = allOpenings.filter(
            ({ region, location, department }) => {
                if (
                    activeLocationFilters.length !== 0 &&
                    !activeLocationFilters.includes(location)
                )
                    return false;
                if (
                    activeRegionFilters.length !== 0 &&
                    !activeRegionFilters.includes(region)
                )
                    return false;
                if (
                    activeDepartmentFilters.length !== 0 &&
                    !activeDepartmentFilters.includes(department)
                )
                    return false;
                return true;
            }
        );
    }

    function resetActiveFilters() {
        activeDepartmentFilters = [];
        activeLocationFilters = [];
        activeRegionFilters = [];
    }
</script>

<div class="job-openings-container">
    <div class="filters" class:open={filtersOpen}>
        <div class="close-filters">
            <button
                class="et_pb_button et_pb_button_0 et_pb_bg_layout_light"
                on:click={() => (filtersOpen = false)}>Close Filters</button
            >
        </div>

        <Filter
            title="Region"
            filters={["North America", "Europe", "Asia"]}
            bind:active={activeRegionFilters}
        />
        <Filter
            title="Department"
            filters={departmentFilters}
            bind:active={activeDepartmentFilters}
        />
        <button
            class="reset et_pb_button et_pb_button_0 et_pb_bg_layout_light"
            on:click={resetActiveFilters}>Reset all</button
        >
    </div>
    <div class="openings">
        <button
            class="open-filters et_pb_button et_pb_button_0 et_pb_bg_layout_light"
            on:click={() => (filtersOpen = true)}>Open Filters</button
        >
        {#each displayedOpenings as opening (opening.id)}
            <div animate:flip={{ duration: 300 }} in:fade={{ duration: 200 }}>
                <Opening {...opening} />
            </div>
        {/each}
    </div>
</div>

<style>
    .filters {
        padding-right: 1rem;
        border-right: 1px solid rgba(0, 0, 0, 0.15);
    }

    /* button {
        border: 2px solid #055aa2;
        font-size: 1rem;
        color: #055aa2;
        cursor: pointer;
        font-weight: bold;
        background-color: #fff;
    } */

    button.reset {
        width: 100%;
    }

    /* button:hover,
    button:focus {
        background-color: #fafafa;
    } */

    .openings {
        padding-left: 2rem;
    }

    .openings > div + div {
        border-top: 1px solid rgba(0, 0, 0, 0.15);
    }

    /* Mobile styles */
    @media screen and (max-width: 980px) {
        .filters {
            display: none;
            padding: 1rem;
            overflow: auto;
            -webkit-box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.25);
            -moz-box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.25);
            box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.25);
            z-index: 1000;
        }

        .filters.open {
            display: block;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 20%;
            right: 0;
            background-color: #fff;
        }

        .close-filters {
            display: flex;
        }

        .close-filters button {
            margin-left: auto;
        }
    }

    /* Tablet and Desktop styles */
    @media screen and (min-width: 980px) {
        .job-openings-container {
            display: grid;
            grid-template-columns: 200px 1fr;
        }

        button.open-filters,
        .close-filters {
            display: none;
        }

        .filters {
            display: block;
            grid-column: 1 / 2;
        }

        .openings {
            grid-column: 2 / 3;
        }
    }
</style>

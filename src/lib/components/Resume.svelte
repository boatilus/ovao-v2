<script lang="ts">
  import { GITHUB_URL } from '$lib/variables'

  export let title = 'Full Stack Developer'

  export let skills = [
    'Collecting & Documenting Requirements',
    'Project Management',
    'Building Workflow Diagrams',
    'Iterative Process Improvement',
    'Maintaining Scope & Schedule',
    'Validating Business Needs',
    'Managing Vendor Relationships',
    'Increasing Productivity & Competency',
    'Converting & Ingesting Data',
    'Cross-Functional Collaboration',
    'Data-Driven Reporting',
    'Policies & Procedures'
  ]

  export let show_quickbooks_cert = false
</script>

<main>
  <div id="top" class="header">
    <div>
      <h1>Ron Jones</h1>
      <h2>{title} <span class="print-only">Profile</span></h2>
    </div>
    <hr class="mobile" />
    <div id="top-right-container">
      Atlanta, GA<br />
      <div id="top-links">
        <a href="mailto:ron@ovao.dev">ron@ovao.dev</a>
        <span>&bullet;</span>
        <a
          href="https://www.linkedin.com/in/ronjoneslosangeles"
          title="LinkedIn Profile"
        >
          <svg
            class="screen-only"
            height="17px"
            viewBox="0 0 358 90"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              fill="white"
              d="M349.942,0 C354.035,0 357.354,3.32 357.354,7.412 L357.354,7.412 L357.354,82.589 C357.354,86.682 354.034,90.001 349.942,90.001 L349.942,90.001 L274.765,90.001 C270.672,90.001 267.353,86.681 267.353,82.589 L267.353,82.589 L267.353,7.412 C267.353,3.319 270.673,0 274.765,0 L274.765,0 Z M327.429,33.751 C320.935,33.751 316.025,37.362 314.339,40.742 L314.339,40.742 L314.339,34.413 L301.767,34.413 L301.767,76.766 L315.002,76.766 L315.002,55.547 C315.002,49.943 317.44,44.67 324.378,44.67 C329.51,44.67 330.884,48.516 330.884,55.547 L330.884,55.547 L330.884,76.766 L344.119,76.766 L344.119,52.736 C344.119,39.376 339.875,33.751 327.429,33.751 Z M293.824,34.413 L280.589,34.413 L280.589,76.766 L293.824,76.766 L293.824,34.413 Z M287.206,11.78 C282.748,11.78 279.132,15.394 279.132,19.854 C279.132,24.312 282.748,27.928 287.206,27.928 C291.664,27.928 295.28,24.312 295.28,19.854 C295.28,15.393 291.664,11.78 287.206,11.78 Z"
            />
            <path
              fill="white"
              d="M254.118,76.766 L242.656,76.766 L242.656,72.001 L242.471,72.001 C241.05,74.201 236.203,77.427 230.295,77.427 C215.847,77.427 209.119,68.361 209.119,55.589 C209.119,42.904 216.2,33.751 228.972,33.751 C235.171,33.751 238.734,36.067 240.884,39.177 L240.884,13.236 L254.119,13.236 L254.119,76.765 L254.118,76.766 Z M231.483,43.942 C225.413,43.942 221.824,48.942 221.824,55.917 C221.824,62.903 225.413,67.236 231.483,67.236 C237.656,67.236 241.412,62.903 241.412,55.917 C241.412,48.942 237.574,43.942 231.483,43.942 Z M202.331,69.735 C198.945,74.036 192.309,77.427 182.647,77.427 C169.526,77.427 161.14,68.567 161.14,54.927 C161.14,43.362 169.33,33.751 183.592,33.751 C195.681,33.751 204.154,42.243 204.154,55.809 C204.154,58.456 203.516,60.857 203.516,60.857 L173.26,60.857 L173.366,61.471 C174.375,64.772 177.641,68.163 183.168,68.163 C188.068,68.163 192.414,65.68 194.246,63.438 L202.33,69.735 L202.331,69.735 Z M192.484,50.951 C191.994,46.589 188.138,43.015 183.328,43.015 C177.444,43.015 173.558,46.814 173.2,50.951 L192.484,50.951 Z M119.118,13.236 L132.353,13.236 L132.353,51.703 L147.063,34.412 L163.088,34.412 L144.567,54.617 L163.39,76.765 L148.056,76.765 L132.354,57.201 L132.354,76.765 L119.119,76.765 L119.119,13.236 L119.118,13.236 Z M68.824,34.413 L80.286,34.413 L80.286,40.348 L80.471,40.348 C82.255,36.957 87.716,33.752 94.236,33.752 C107.813,33.752 111.177,41.444 111.177,53.054 L111.177,76.766 L97.942,76.766 L97.942,55.878 C97.942,50.878 97.677,44.39 90.803,44.39 C83.839,44.39 82.06,50.251 82.06,55.878 L82.06,76.766 L68.825,76.766 L68.825,34.413 L68.824,34.413 Z M54.265,13.567 C58.286,13.567 61.875,17.159 61.875,21.177 C61.875,25.195 58.286,28.787 54.265,28.787 C50.247,28.787 46.655,25.195 46.655,21.177 C46.655,17.159 50.247,13.567 54.265,13.567 Z M47.647,76.766 L60.882,76.766 L60.882,34.413 L47.647,34.413 L47.647,76.766 Z M-2.84217094e-14,13.236 L13.235,13.236 L13.235,63.53 L39.706,63.53 L39.706,76.765 L-2.84217094e-14,76.765 L-2.84217094e-14,13.236 Z"
            />
          </svg>
          <span class="print-only">https://ovao.dev/linkedin</span>
        </a>
      </div>
    </div>
  </div>

  <section id="summary" class="block">
    <p>
      Analytical, solutions-focused professional offering technology and project
      management expertise with proven success in collaboratively resolving
      challenges for diverse small- and mid-sized businesses through automation
      and code. History of innovating bespoke software integration solutions to
      drive process improvement and operational excellence. Unique blend of
      financial acumen, programming and design proficiency, and
      relationship-building skills leveraged to harness opportunities and
      mitigate risks.
    </p>
  </section>

  <section id="key_skills" class="block">
    <h1>Key Skills</h1>
    <ul>
      {#each skills as skill}
        <li>{skill}</li>
      {/each}
    </ul>
  </section>

  <section id="professional_experience" class="block">
    <h1>Professional Experience</h1>

    <div class="header">
      <div>
        <p>
          <strong>Mindful (Virtual Hold Technology Solutions, LLC.)</strong>
          <span class="city">Remote</span><br />
          <strong>Full Stack Developer</strong>
        </p>
      </div>
      <div class="date-range">4/2022 - current</div>
    </div>

    <p>
      Architected, developed, and deployed high-availability serverless AWS
      applications using AWS Cloud Developer Kit and TypeScript. Converted
      existing legacy Serverless framework applications to CDK, leveraging
      advanced infrastructure-as-code practices to improve deploy-time
      consistency and type safety. Implemented Virtual Private Cloud and
      interface endpoints to deliver FedRAMP-compliant services.
    </p>

    <ul>
      <li>
        Developed common libraries and services to enable teams to quickly
        migrate services to modern CDK paradigms.
      </li>
      <li>
        Delivered DBT-backed data model processing application via AWS Fargate
        and ECS, utilizing responsive, cost-minimizing on-demand pipelines.
      </li>
      <li>
        Integrated Terraform automation to support deployment of IAM roles, role
        groups, and services via Atlantis, enabling rapid iteration of core
        deployment service groups, reducing DevOps friction.
      </li>
    </ul>
    <br />

    <div class="header">
      <div>
        <p>
          <strong>Lifeway Mobility, LLC</strong>
          <span class="city">Los Angeles, CA</span><br />
          <strong>Manager of Operations, California</strong>
        </p>
      </div>
      <div class="date-range">7/2018 - 11/2021</div>
    </div>

    <p>
      Improved customer experiences by enabling sales staff to quickly and
      accurately produce quotes via proprietary tablet-focused quoting and
      in-home presentation app. Facilitated meetings with vendors and served as
      hands-on developer, working collaboratively to align deliverables with
      requirements and specifications. Collected and documented requirements for
      new and existing platforms.
    </p>

    <ul>
      <li>
        Delivered custom API integration between Square payment processing and
        QuickBooks Online to unlock immediate transaction synchronization and
        classification capabilities and automate deposit recording, manager
        payment digests, and SMS alerts for manually-keyed card transactions
        exceeding specified thresholds.
      </li>
      <li>
        Streamlined enterprise-wide workflows and reduced risk of errors by
        introducing tailor-made CRM processes with complex per-location event
        branching.
      </li>
      <li>
        Reduced credit card processing fees by 23% through persistent
        negotiation with vendor.
      </li>
      <li>
        Secured 49% open rate and 19% click-through rate on 2.8% industry
        average by designing email campaigns with custom templates.
      </li>
      <li>
        Elevated overall employee competency regarding SQL for CRM data
        analytics and reporting by hosting beginner- and intermediate-level
        workshops, improving data-driven policy decisions.
      </li>
      <li>
        Decreased extraneous construction material and labor costs by 14% by
        implementing project-based receipt tracking and automated labor rate
        computation.
      </li>
    </ul>
    <br />

    <div class="header">
      <div>
        <p>
          <strong>MF Riko, Inc.</strong>
          <span class="city">Los Angeles, CA</span><br />
          <strong>Controller</strong>
        </p>
      </div>
      <div class="date-range">7/2005 - 7/2018</div>
    </div>

    <p>
      Oversaw overall accounting practices and implementation, balancing
      priorities between payables, receivables, financial reporting, budgeting,
      forecasting, payroll, tax filing, and regulatory compliance. Oversaw
      overall accounting practices and implementation. Instituted custom
      voicemail and call routing solution to replace legacy hosted PBX system.
      Drove regulatory alignment by establishing and enforcing HACCP food safety
      compliance program.
    </p>

    <ul>
      <li>
        Enabled 360% revenue growth by creating adaptable, scalable
        administrative practices.
      </li>
      <li>
        Diminished outstanding receivables by 12% with custom-developed payment
        tracking system.
      </li>
      <li>
        Processed 230K+ vendor receipts, 35K bill payments, 25K deposits, and
        50K customer payments.
      </li>
      <li>
        Augmented customer experiences and loyalty by developing, deploying, and
        managing mobile-first, Golang-based online ordering system for 65% of
        customers, integrating Compeat RMS support for $2M/year customer, and
        creating Node.js-based online ordering system for $600K/year client.
      </li>
    </ul>
  </section>

  <section id="technical_proficiencies" class="block">
    <h1>Technical Proficiencies</h1>
    <div id="technical_proficiencies-grid">
      <h3><strong>Environments</strong></h3>
      <p>Windows, macOS, Linux, CI/CD platforms.</p>
      <h3><strong>Tools</strong></h3>
      <p>
        JIRA, Acumatica, Tableau, Microsoft SQL Server Management Studio,
        Microsoft Office 365, Git, Node.js, Go web applications, REST APIs,
        React / React Native, container-based PaaS, Adobe Photoshop &
        Illustrator, Sketch, Pixelmator Pro, QuickBooks Online / Desktop (inc.
        payroll), Square Payments, Twilio, Compeat RMS.
      </p>
      <h3><strong>Databases</strong></h3>
      <p>
        SQL databases (PostgreSQL, MySQL, Microsoft SQL Server), NoSQL stores
        (MongoDB, RethinkDB), and key-value stores (Redis, LMDB, BoltDB).
      </p>
      <h3><strong>Languages</strong></h3>
      <p>
        C++17/20, Golang, Python, SQL, GraphQL, JavaScript / TypeScript, HTML,
        CSS
      </p>
    </div>
  </section>

  <section id="open_source" class="block">
    <h1>Open Source Work</h1>
    <ul>
      <li>
        <strong><a href="{GITHUB_URL}/slid" rel="external">slid</a></strong> - Simple,
        12-byte lexicographically-sortable identifiers in Go
      </li>
      <li>
        <strong><a href="{GITHUB_URL}/fox" rel="external">fox</a></strong> - A simple
        Go client for the Twilio fax API
      </li>
      <li>
        <strong>
          <a href="{GITHUB_URL}/svelte-transition-extras" rel="external"
            >svelte-transition-extras</a
          ></strong
        > - Finer-grained execution over Svelte's built-in transitions
      </li>
      <li>
        <strong>
          <a href="{GITHUB_URL}/svelte-preprocess-escape" rel="external"
            >svelte-preprocess-escape</a
          ></strong
        > - A Svelte preprocessor that allows rendering Svelte code within components
      </li>
      <li>
        <strong>
          <a href="{GITHUB_URL}/cloudformation-resources"
            >cloudformation-resources</a
          >
        </strong> - Typed resource qualifiers for AWS CloudFormation
      </li>
      <li>
        <strong>
          <a href="{GITHUB_URL}/iron-utility" rel="external">iron-utility</a
          ></strong
        > - A small grab bag of C++ type-oriented utilities
      </li>
      <li>
        <strong>
          <a href="{GITHUB_URL}/storefront-go" rel="external">storefront-go</a>
        </strong> - An experimental Shopify Storefront API client in Go
      </li>
      <li class="contributor">
        <strong>
          <a
            href="https://github.com/supabase-community/postgrest-go"
            rel="external">postgrest-go</a
          ></strong
        > - Isomorphic Go client for PostgREST
      </li>
    </ul>
  </section>

  <section id="training" class="block">
    <h1>Professional Training & Certifications</h1>
    <p>
      <strong>AWS Certified Cloud Practitioner</strong>
      <br />
      Amazon Web Services (issued: 4/2022)
    </p>

    <p>
      <strong>
        <a
          href="https://www.credly.com/badges/e4d77ce7-7781-4c6f-afc0-0af1d020bc42"
          rel="external"
        >
          IBM Data Analyst Professional Certification</a
        >
      </strong>
      <br />
      IBM (issued: 3/2022)
    </p>

    <p>
      <strong>
        <a
          href="https://skillshop.exceedlms.com/student/award/podz45AiuxwqYjncscADSWRw"
          rel="external"
        >
          Google Analytics Individual Qualification
        </a>
      </strong>
      <br />
      Google (expires: 2/2023)
    </p>

    <p>
      <strong>Salesforce Administrator Certification</strong><br />
      Salesforce (anticipated completion: 4/2022)
    </p>

    {#if show_quickbooks_cert}
      <p>
        <strong>QuickBooks Online Advanced ProAdvisor Certification</strong><br
        />
        Intuit
      </p>
    {/if}
  </section>
</main>

<style lang="scss">
  @import './src/_core';

  @media screen {
    strong {
      color: white;
      font-weight: 500;
    }

    h1 {
      font-weight: 500;
    }
  }

  @media print {
    strong {
      font-weight: 600;
    }

    h1 {
      font-weight: 600;
    }
  }

  a > svg path {
    fill: var(--color-link);
  }

  main {
    font-family: var(--font-system);

    @include desktop {
      margin: 2em auto;
      max-width: 800px;
      padding-bottom: 2em;
    }

    @include mobile {
      margin: 0.5em 1em;
      padding-bottom: 1em;
    }
  }

  h1,
  h2 {
    cursor: default;
    margin: 0;
    padding: 0;
  }

  .mobile {
    @include desktop {
      display: none;
    }
  }

  hr.mobile {
    border: 0;
    height: 2px;
    background: var(--color-subdued);
    width: 100%;
  }

  h2 {
    font-weight: 400;
  }

  p,
  li {
    line-height: 1.7em;
  }

  ul {
    @include mobile {
      padding: 0 0 0 1em;
    }
  }

  li {
    margin-bottom: 0.5em;
  }

  p {
    margin: 0 0 1em 0;

    @include desktop {
      text-align: justify;
    }
  }

  .block {
    margin-top: 2.5em;

    h1 {
      @media screen {
        border-bottom-color: var(--color-subdued);
      }

      @media print {
        border-bottom-color: var(--color-text);
      }

      border-bottom-width: 2px;
      border-bottom-style: solid;
      font-size: 1.4rem;
      font-weight: 400;
      padding-bottom: 0.3em;
      margin-bottom: 0.75em;
    }
  }

  .header {
    display: flex;

    @include mobile {
      flex-direction: column;
    }

    @include desktop {
      justify-content: space-between;

      div:nth-child(2) {
        text-align: right;
      }
    }
  }

  .city {
    margin-left: 1em;
  }

  .date-range {
    @include mobile {
      margin-bottom: 1em;
    }
  }

  #top {
    @include desktop {
      align-items: flex-end;
    }

    @include mobile {
      flex-direction: column;
      gap: 0.5em;
    }

    h1 {
      color: white;
    }

    div:nth-child(2) {
      line-height: 1.4em;
    }
  }

  #top-right-container {
    @include desktop {
      text-align: right;
    }
  }

  #top-links {
    display: flex;
    align-items: center;
    margin-top: 0.3em;

    @include desktop {
      justify-content: flex-end;
    }

    a {
      display: flex;
    }
    span {
      margin: 0 0.35em;
    }
  }

  #key_skills ul {
    @include desktop {
      column-count: 2;
    }

    margin: 0;
    padding: 0;

    li {
      margin: 0;
      padding: 0 2em 0 0;
      white-space: nowrap;
      list-style-position: inside;
    }
  }

  #training {
    p {
      text-align: left;
    }
  }

  #technical_proficiencies-grid {
    display: grid;

    h3 {
      font-size: inherit;
      margin: 0;
      line-height: 1.7em;
    }

    @include desktop {
      grid-template-columns: min-content 1fr;
      column-gap: 1.5em;

      strong::after {
        content: ':';
      }

      p {
        text-align: left;
      }
    }

    @include mobile {
      row-gap: 0.5em;
      margin-top: 1.5em;

      h3 {
        margin: -0.4em 0;
      }
    }
  }

  #open_source {
    ul {
      margin: 0;
      padding: 0 1em;
    }

    .contributor::after {
      --color: hsl(var(--primary-hue), 15%, 44%);

      border: 1px solid var(--color);
      border-radius: 200px;
      content: 'Contributor';
      color: var(--color);
      font-size: small;
      margin-left: 0.8em;
      letter-spacing: 0.06em;
      padding: 0.2em 0.65em;
      text-transform: uppercase;
    }
  }
</style>

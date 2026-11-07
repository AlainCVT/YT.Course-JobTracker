import type { JobApplicationType } from "@/lib/models";

export const JOB_APPLICATIONS_FIXTURES: Pick<
  JobApplicationType,
  "company" | "position" | "location" | "salary" | "url" | "tags" | "description" | "notes"
>[] = [
  {
    company: "BrightLayer Digital",
    position: "Backend Software Engineer",
    location: "Amsterdam, Netherlands (Hybrid)",
    salary: [55000, 70000],
    url: "https://careers.brightlayer.io/backend-engineer",
    tags: [
      "Full-time",
      "Permanent",
      "Node.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Microservices",
    ],
    description: `About BrightLayer Digital

BrightLayer Digital is an innovative software company developing scalable digital platforms for businesses across Europe. We are currently expanding our engineering team and looking for a Backend Software Engineer passionate about building reliable and high-performance systems.

Your responsibilities:
- Design, develop, and maintain backend services using Node.js and TypeScript.
- Build scalable REST APIs and microservices using NestJS.
- Design and optimize PostgreSQL database schemas.
- Implement caching strategies using Redis.
- Monitor application performance and troubleshoot production issues.
- Work closely with frontend engineers, product managers, and designers.
- Write clean, maintainable, and well-tested code.
- Participate in code reviews and technical architecture discussions.

Requirements:
- 3+ years of professional backend development experience.
- Strong knowledge of Node.js and TypeScript.
- Experience with NestJS or another backend framework.
- Good understanding of SQL databases and database optimization.
- Familiarity with Redis, Docker, and AWS.
- Experience designing REST APIs and distributed systems.
- Good communication and problem-solving skills.

What we offer:
- Annual salary between €55,000 and €70,000.
- Hybrid working arrangement with 2 office days per week.
- 30 days of paid vacation.
- Annual training and conference budget.
- Company-provided laptop and equipment.
- Pension contribution.
- International and multicultural team.
- Opportunities for career growth and technical leadership.`,
    notes: `- The tech stack looks very interesting, especially NestJS and microservices.
- Salary range is good, but I should try negotiating closer to €70k.
- Need to check whether relocation assistance is available.
- The 2 office days per week seem reasonable.
- Prepare examples of previous backend architecture projects before the interview.
- Check employee reviews and company culture before applying.`,
  },
  {
    company: "Aether Labs",
    position: "Frontend Software Engineer",
    location: "Berlin, Germany (Hybrid)",
    salary: [48000, 62000],
    url: "https://careers.aetherlabs.io/frontend-engineer",
    tags: [
      "Full-time",
      "Permanent",
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "Jest",
      "Playwright",
      "AWS",
    ],
    description: `About Aether Labs

Aether Labs is a product-focused technology company building next-generation SaaS platforms for the European market. We help businesses automate complex processes through intuitive, reliable, and scalable software.

We are looking for a Frontend Software Engineer to join our product engineering team and help us deliver exceptional user experiences.

Your responsibilities:
- Build and maintain modern web applications using React, TypeScript, and Next.js.
- Develop reusable UI components and contribute to our design system.
- Collaborate with UX/UI designers to turn Figma designs into responsive interfaces.
- Improve application performance, accessibility, and SEO.
- Integrate frontend applications with REST and GraphQL APIs.
- Write unit and end-to-end tests using Jest and Playwright.
- Participate in code reviews and technical planning.
- Identify and resolve bugs and performance bottlenecks.

What we're looking for:
- 3+ years of professional frontend development experience.
- Strong knowledge of React and TypeScript.
- Experience with Next.js and modern frontend tooling.
- Good understanding of responsive design and web accessibility.
- Familiarity with automated testing and CI/CD workflows.
- Experience working in an agile development environment.
- A proactive mindset and strong attention to detail.

Benefits:
- Competitive annual salary between €48,000 and €62,000.
- Flexible hybrid working policy (2 days per week in the office).
- 28 days of paid annual leave.
- Relocation assistance for international candidates.
- Annual professional development budget of €1,500.
- Private health insurance.
- Modern equipment and home office allowance.
- Regular team events and international company retreats.`,
    notes: `- This position is a strong match for my React and TypeScript experience.
- Salary is slightly below my initial target, but the benefits look attractive.
- Relocation assistance could be useful if I decide to move to Berlin.
- I should review their product and design system before applying.
- Check whether the interview process includes a live coding exercise.
- Update my portfolio with recent Next.js projects.
- Potential concern: hybrid work requires being in Berlin twice a week.
- Priority: High. Apply before the end of the week.`,
  },
  {
    company: "Finovate Systems",
    position: "Full Stack Developer",
    location: "Dublin, Ireland (Remote-friendly)",
    salary: [50000, 65000],
    url: "https://careers.finovate-systems.com/full-stack-developer",
    tags: [
      "Full-time",
      "Permanent",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "GraphQL",
      "Docker",
      "GitHub Actions",
    ],
    description: `About Finovate Systems

Finovate Systems is a growing fintech company developing innovative payment and financial management solutions for businesses and individuals. Our platform helps thousands of customers manage transactions, automate payments, and gain better insights into their finances.

We are looking for a Full Stack Developer to join our engineering team and contribute to the development of our core platform.

Your responsibilities:
- Develop and maintain frontend applications using React and TypeScript.
- Build scalable backend services and APIs with Node.js and Express.
- Design and optimize database structures using MongoDB.
- Integrate third-party payment providers and financial APIs.
- Write clean, reusable, and well-documented code.
- Collaborate with designers, product managers, and other engineers.
- Identify and resolve technical issues across the application.
- Participate in code reviews and sprint planning.
- Contribute to improving development workflows and CI/CD pipelines.

Requirements:
- 3+ years of experience in full stack web development.
- Strong knowledge of JavaScript and TypeScript.
- Professional experience with React and Node.js.
- Familiarity with MongoDB and API design.
- Understanding of authentication, authorization, and web security.
- Experience with Git and modern development tools.
- Good analytical and problem-solving skills.
- Ability to work independently in a distributed team.

Nice to have:
- Experience in fintech or payment processing.
- Knowledge of GraphQL.
- Familiarity with Docker and cloud infrastructure.
- Experience with automated testing.

What we offer:
- Annual salary between €50,000 and €65,000.
- Flexible remote working policy.
- 25 days of paid annual leave.
- Private health insurance.
- Annual learning and development allowance.
- Company-sponsored technical conferences.
- Modern laptop and home office equipment.
- Collaborative international engineering team.
- Opportunities to grow into a senior or technical leadership role.`,
    notes: `- Very interesting opportunity because it combines frontend and backend development.
- The fintech industry could be a great opportunity to gain experience in a specialized domain.
- Salary range is within my expectations.
- Need to clarify whether remote work is possible from France or only from Ireland.
- I have some experience with payment integrations, which could be a good selling point.
- Review my previous MongoDB projects and prepare relevant examples.
- Research the company's products and competitors before the interview.
- Ask about the size of the engineering team and current technical challenges.
- Priority: High. This is one of the most interesting opportunities in my current search.`,
  },
  {
    company: "DeepMetric AI",
    position: "Data Scientist",
    location: "Amsterdam, Netherlands (Hybrid)",
    salary: [55000, 70000],
    url: "https://careers.deepmetric.ai/data-scientist",
    tags: [
      "Full-time",
      "Permanent",
      "Python",
      "Machine Learning",
      "Deep Learning",
      "SQL",
      "Pandas",
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "MLOps",
      "Data Science",
    ],
    description: `About DeepMetric AI

DeepMetric AI is an innovative artificial intelligence company developing predictive analytics solutions for businesses across Europe. Our platform helps organizations make better decisions by transforming large volumes of data into actionable insights.

We are looking for a Data Scientist to join our growing AI team and develop machine learning models that solve real-world business problems.

Your responsibilities:
- Collect, clean, and analyze large datasets from multiple sources.
- Develop predictive models using machine learning techniques.
- Perform exploratory data analysis to identify trends and patterns.
- Build and evaluate classification, regression, and clustering models.
- Collaborate with data engineers to design reliable data pipelines.
- Optimize model performance and improve prediction accuracy.
- Communicate analytical findings to technical and non-technical stakeholders.
- Deploy machine learning models into production environments.
- Monitor model performance and identify potential data drift.
- Contribute to research and experimentation with emerging AI techniques.

Requirements:
- 3+ years of experience in data science or machine learning.
- Strong programming skills in Python.
- Good knowledge of SQL and relational databases.
- Practical experience with Pandas, NumPy, and Scikit-learn.
- Understanding of statistical modeling and machine learning algorithms.
- Experience with data visualization and analytical reporting.
- Familiarity with model evaluation and validation techniques.
- Strong analytical thinking and problem-solving skills.

Nice to have:
- Experience with PyTorch or TensorFlow.
- Knowledge of cloud platforms such as AWS or GCP.
- Familiarity with MLOps tools and workflows.
- Experience deploying models through APIs.
- Knowledge of large language models and generative AI.

What we offer:
- Annual salary between €55,000 and €70,000.
- Hybrid working arrangement with 2 office days per week.
- 28 days of paid annual leave.
- Private health insurance.
- Annual learning and development budget.
- Access to cloud computing resources for experimentation.
- Flexible working hours.
- Company-sponsored conferences and technical events.
- Opportunity to work on innovative AI projects.
- International team with a strong research culture.`,
    notes: `- This position is particularly interesting because it combines statistical analysis and practical machine learning.
- Salary is attractive and aligns with my expectations.
- I should strengthen my knowledge of statistical inference and model evaluation.
- Review my previous machine learning projects and prepare a GitHub portfolio.
- Look into the company's actual AI products to understand their business applications.
- Ask how much time is dedicated to experimentation versus production work.
- Check whether the team already has established MLOps practices.
- Prepare for a potential technical assessment involving Python, SQL, and machine learning concepts.
- My experience with PyTorch could be a good differentiator.
- Priority: High. One of the most appealing opportunities in the AI field.`,
  },
  {
    company: "Monolith Digital",
    position: "Senior Product Designer (UX/UI)",
    location: "Paris, France (Hybrid)",
    salary: [48000, 60000],
    url: "https://careers.monolith-digital.com/product-designer",
    tags: [
      "Full-time",
      "Permanent",
      "UX Design",
      "UI Design",
      "Figma",
      "Design Systems",
      "Prototyping",
      "User Research",
      "SaaS",
      "Accessibility",
    ],
    description: `About Monolith Digital

Monolith Digital is a fast-growing B2B SaaS company developing innovative workflow management tools for modern businesses. Our mission is to make complex processes simpler through intuitive and accessible digital experiences.

We are looking for a Senior Product Designer to join our product team and take ownership of the user experience across our platform.

Your responsibilities:
- Lead the design process from discovery and user research to final implementation.
- Create intuitive user interfaces and interactive prototypes using Figma.
- Collaborate with product managers and engineers to define product requirements.
- Conduct user interviews, usability tests, and customer feedback sessions.
- Maintain and improve our existing design system.
- Translate complex business requirements into simple user experiences.
- Ensure consistency across desktop and mobile applications.
- Identify usability issues and propose data-driven improvements.
- Work closely with developers to ensure design quality during implementation.
- Contribute to product strategy and long-term design decisions.

Requirements:
- 4+ years of experience in product design or UX/UI design.
- Strong portfolio demonstrating end-to-end product design projects.
- Advanced proficiency in Figma and prototyping tools.
- Solid understanding of UX research and interaction design.
- Experience designing complex SaaS applications.
- Knowledge of responsive design and accessibility standards.
- Ability to communicate and present design decisions.
- Strong collaboration skills and attention to detail.

Nice to have:
- Experience building and maintaining design systems.
- Familiarity with HTML and CSS.
- Experience working in an agile product environment.
- Knowledge of analytics tools such as Mixpanel or Amplitude.

What we offer:
- Annual salary between €48,000 and €60,000.
- Hybrid working arrangement with 2 office days per week.
- 27 days of paid annual leave.
- Private health insurance.
- Annual learning budget of €1,500.
- Modern equipment and home office allowance.
- Regular design workshops and team events.
- Opportunity to influence product strategy.
- Collaborative environment with a strong design culture.`,
    notes: `- The position looks interesting because it combines UX research and hands-on interface design.
- Salary is within my expectations, although I should aim for the upper end given the seniority.
- I need to reorganize my portfolio and highlight projects where I owned the entire design process.
- Prepare a case study explaining my design decisions and their impact on business metrics.
- Research the company's existing product before applying.
- Check whether the design team already has an established design system.
- Ask how designers collaborate with frontend engineers during implementation.
- The hybrid arrangement is convenient.
- Potential concern: the role seems to involve a lot of stakeholder management.
- Priority: High. Worth applying if my portfolio is ready.`,
  },
  {
    company: "QualityForge",
    position: "QA Automation Engineer",
    location: "Prague, Czech Republic (Hybrid)",
    salary: [48000, 62000],
    url: "https://careers.qualityforge.io/qa-automation-engineer",
    tags: [
      "Full-time",
      "Permanent",
      "QA Engineering",
      "Test Automation",
      "Playwright",
      "Cypress",
      "TypeScript",
      "Selenium",
      "Jest",
      "API Testing",
      "CI/CD",
      "Agile",
    ],
    description: `About QualityForge

QualityForge is a software quality engineering company helping technology businesses deliver reliable, high-performance digital products. We work with international clients to improve their software testing strategies and build robust automated testing environments.

We are looking for a QA Automation Engineer to join our engineering team and help ensure the quality of our web applications and APIs.

Your responsibilities:
- Design, develop, and maintain automated test suites using Playwright and TypeScript.
- Create end-to-end, integration, and regression tests.
- Perform API testing and validate backend services.
- Collaborate with developers to identify and reproduce software defects.
- Integrate automated tests into CI/CD pipelines.
- Analyze test results and investigate application failures.
- Develop and maintain testing strategies and documentation.
- Participate in sprint planning and software quality reviews.
- Identify opportunities to improve test coverage and execution speed.
- Work closely with product managers and developers throughout the release cycle.

Requirements:
- 3+ years of experience in software testing or QA automation.
- Strong knowledge of automated testing methodologies.
- Hands-on experience with Playwright, Cypress, or Selenium.
- Good programming skills in TypeScript, JavaScript, or Python.
- Experience with API testing and REST services.
- Understanding of CI/CD pipelines and Git workflows.
- Familiarity with Agile and Scrum methodologies.
- Strong analytical skills and attention to detail.

Nice to have:
- Experience with performance testing tools such as k6.
- Knowledge of Docker and containerized environments.
- Familiarity with accessibility testing.
- Experience testing applications built with React or Angular.
- Knowledge of test reporting and quality metrics.

What we offer:
- Annual salary between €48,000 and €62,000.
- Hybrid working arrangement with 2 office days per week.
- 26 days of paid annual leave.
- Private health insurance.
- Annual training and certification budget.
- Flexible working hours.
- Home office equipment allowance.
- International engineering team.
- Opportunities to contribute to quality engineering best practices.`,
    notes: `- Playwright and TypeScript are a strong match for my technical interests.
- The role seems more focused on automation than manual testing, which is what I prefer.
- Salary is within my expectations.
- I should build a small Playwright project to demonstrate my testing approach.
- Review API testing concepts and HTTP status codes before the technical interview.
- Check whether the company uses a page object model or another testing architecture.
- Ask how automated tests are integrated into their deployment pipeline.
- Find out whether QA engineers are involved from the beginning of feature development.
- Prepare examples of bugs I identified and how I helped resolve them.
- Priority: High. Interesting opportunity with a modern testing stack.`,
  },
  {
    company: "Vertex Interactive",
    position: "Software Engineer – Web Applications",
    location: "Barcelona, Spain (Hybrid)",
    salary: [45000, 58000],
    url: "https://careers.vertexinteractive.com/software-engineer",
    tags: [
      "Full-time",
      "Permanent",
      "JavaScript",
      "TypeScript",
      "Vue.js",
      "Nuxt",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Kubernetes",
    ],
    description: `About Vertex Interactive

Vertex Interactive is an international software development company specializing in digital platforms and business automation solutions. We work with innovative companies across Europe to build scalable products that simplify everyday business operations.

We are looking for a Software Engineer to join our multidisciplinary engineering team and help us develop and improve our web applications.

Your responsibilities:
- Develop and maintain responsive web applications using Vue.js and TypeScript.
- Build backend services and REST APIs using Python and FastAPI.
- Design and optimize database schemas using PostgreSQL.
- Collaborate with product designers to implement intuitive user interfaces.
- Improve application performance, scalability, and reliability.
- Write automated tests and maintain code quality standards.
- Participate in architecture discussions and technical decision-making.
- Investigate bugs and provide solutions to production issues.
- Contribute to continuous integration and deployment processes.

Requirements:
- 3+ years of experience in software development.
- Strong knowledge of JavaScript or TypeScript.
- Professional experience with Vue.js or another modern frontend framework.
- Experience developing backend applications with Python.
- Good understanding of REST APIs and relational databases.
- Familiarity with Docker and cloud-based infrastructure.
- Ability to communicate effectively in an international team.
- Strong problem-solving skills and attention to detail.

Nice to have:
- Experience with Nuxt.js.
- Knowledge of Kubernetes.
- Familiarity with agile development methodologies.
- Experience working in a SaaS environment.

What we offer:
- Competitive annual salary between €45,000 and €58,000.
- Flexible hybrid working arrangement (2 days per week in the office).
- 26 days of paid annual leave.
- Private health insurance.
- Monthly meal allowance.
- Annual training and certification budget.
- Relocation support for international candidates.
- Flexible working hours.
- Modern equipment and a collaborative work environment.`,
    notes: `- The combination of Vue.js and Python is interesting, although most of my recent projects have been React-based.
- Salary expectations are reasonable for Barcelona.
- I should investigate how much Python experience they actually expect from candidates.
- The relocation package is worth asking about.
- Check whether the company supports fully remote work occasionally.
- Prepare examples of API development and database optimization.
- Update my CV to highlight transferable frontend skills.
- Look up the engineering team on LinkedIn before applying.
- Priority: Medium. Interesting opportunity, but I want to compare it with other offers first.`,
  },
  {
    company: "Northstar Analytics",
    position: "Backend Developer – Node.js",
    location: "Stockholm, Sweden (Hybrid)",
    salary: [52000, 68000],
    url: "https://careers.northstaranalytics.com/backend-developer",
    tags: [
      "Full-time",
      "Permanent",
      "Node.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Kafka",
      "Docker",
      "Azure",
      "Microservices",
    ],
    description: `About Northstar Analytics

Northstar Analytics is a technology company specializing in data-driven software solutions. We help organizations transform complex datasets into actionable insights through modern analytics platforms and intelligent automation tools.

We are looking for a Backend Developer to join our growing engineering department and contribute to the development of our next-generation data platform.

Your responsibilities:
- Design and develop scalable backend services using Node.js and TypeScript.
- Build and maintain RESTful APIs using NestJS.
- Design database schemas and optimize queries with PostgreSQL and Prisma.
- Develop event-driven services using Apache Kafka.
- Implement authentication, authorization, and data protection mechanisms.
- Monitor application performance and improve system reliability.
- Collaborate with frontend developers, data engineers, and product managers.
- Write unit and integration tests to ensure software quality.
- Participate in code reviews and technical architecture discussions.

Requirements:
- 3+ years of professional backend development experience.
- Strong knowledge of Node.js and TypeScript.
- Experience with NestJS or similar backend frameworks.
- Good understanding of PostgreSQL and database optimization.
- Familiarity with event-driven architectures and messaging systems.
- Experience with Docker and cloud environments.
- Understanding of software testing and CI/CD practices.
- Strong communication and problem-solving skills.

Nice to have:
- Experience with Apache Kafka.
- Knowledge of Microsoft Azure.
- Familiarity with distributed systems.
- Experience working with data-intensive applications.

What we offer:
- Annual salary between €52,000 and €68,000.
- Hybrid working arrangement with 2 office days per week.
- 30 days of paid annual leave.
- Private healthcare insurance.
- Annual performance bonus.
- Professional development and certification budget.
- Pension contributions.
- Relocation assistance.
- Modern office in central Stockholm.
- International team and regular engineering meetups.`,
    notes: `- Strong match for my Node.js and TypeScript experience.
- The opportunity to work with Kafka and distributed systems is particularly appealing.
- Salary range is attractive, although I should aim for at least €62k.
- Need to check whether the company sponsors work permits for international applicants.
- Research their data platform and technical architecture before applying.
- Prepare examples of backend services handling high traffic.
- Review my knowledge of event-driven architecture before the technical interview.
- Ask about the on-call rotation and production support expectations.
- Priority: High. Definitely worth applying to.`,
  },
  {
    company: "Elevate Commerce",
    position: "Frontend Engineer – React & Next.js",
    location: "Lisbon, Portugal (Remote)",
    salary: [42000, 55000],
    url: "https://careers.elevatecommerce.io/frontend-engineer",
    tags: [
      "Full-time",
      "Permanent",
      "Remote",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Storybook",
      "Cypress",
    ],
    description: `About Elevate Commerce

Elevate Commerce is a fast-growing technology company building modern e-commerce solutions for ambitious brands. Our platform helps online retailers optimize their operations, improve customer experiences, and scale their businesses internationally.

We are looking for a talented Frontend Engineer to join our product team and help us build fast, accessible, and intuitive web experiences.

Your responsibilities:
- Develop modern frontend applications using React, Next.js, and TypeScript.
- Build reusable components and maintain our internal design system.
- Translate Figma designs into responsive and accessible interfaces.
- Optimize application performance and Core Web Vitals.
- Manage application state using Redux Toolkit and modern React patterns.
- Integrate frontend applications with REST and GraphQL APIs.
- Write unit and end-to-end tests using Cypress.
- Collaborate with designers, backend engineers, and product managers.
- Participate in code reviews and frontend architecture decisions.

Requirements:
- 3+ years of professional frontend development experience.
- Strong expertise in React and TypeScript.
- Experience with Next.js and server-side rendering.
- Good understanding of HTML, CSS, and modern JavaScript.
- Experience building responsive and accessible interfaces.
- Familiarity with frontend testing tools.
- Understanding of web performance optimization.
- Ability to work independently in a remote environment.

Nice to have:
- Experience with e-commerce platforms.
- Knowledge of Storybook and component-driven development.
- Familiarity with SEO optimization.
- Experience with internationalization and multilingual applications.

What we offer:
- Annual salary between €42,000 and €55,000.
- Fully remote working arrangement within eligible European countries.
- 25 days of paid annual leave.
- Flexible working hours.
- Annual equipment allowance.
- Private health insurance.
- €1,200 annual learning budget.
- Company-sponsored conferences and events.
- Regular team gatherings in Lisbon.
- Opportunity to work on a product used by international brands.`,
    notes: `- Fully remote work is a major advantage for me.
- The React and Next.js stack matches my experience very well.
- Salary is slightly lower than my target, but the flexibility could compensate.
- Need to confirm whether employees based in France are eligible for remote employment.
- Check if the company offers a French employment contract or requires contractor status.
- Review their existing platform to understand the product and user experience.
- Prepare a few examples of performance improvements I've implemented.
- Add my latest Next.js project to my portfolio.
- Ask about the frontend team's size and development workflow.
- Priority: High. One of my favorite opportunities so far.`,
  },
  {
    company: "SentinelCore Security",
    position: "Cybersecurity Analyst",
    location: "Brussels, Belgium (Hybrid)",
    salary: [45000, 58000],
    url: "https://careers.sentinelcore-security.com/cybersecurity-analyst",
    tags: [
      "Full-time",
      "Permanent",
      "Cybersecurity",
      "SIEM",
      "SOC",
      "Splunk",
      "Microsoft Sentinel",
      "Incident Response",
      "Threat Intelligence",
      "Linux",
      "Networking",
    ],
    description: `About SentinelCore Security

SentinelCore Security is a cybersecurity company helping organizations protect their digital infrastructure against evolving cyber threats. We provide security monitoring, threat detection, and incident response services to businesses across Europe.

We are looking for a Cybersecurity Analyst to join our Security Operations Center (SOC) and help strengthen our clients' security posture.

Your responsibilities:
- Monitor security alerts and investigate suspicious activities.
- Analyze security events using SIEM platforms such as Splunk and Microsoft Sentinel.
- Identify potential threats and assess their severity.
- Investigate security incidents and contribute to incident response activities.
- Perform log analysis across endpoints, servers, and network devices.
- Document incidents and prepare detailed investigation reports.
- Collaborate with senior analysts to improve detection rules.
- Research emerging threats and attack techniques.
- Participate in vulnerability assessments and security reviews.
- Contribute to improving internal security procedures.

Requirements:
- 2+ years of experience in cybersecurity, preferably within a SOC environment.
- Good understanding of networking protocols and operating systems.
- Familiarity with SIEM solutions and security monitoring tools.
- Knowledge of common cyber threats and attack techniques.
- Experience with Linux and Windows environments.
- Understanding of incident response methodologies.
- Strong analytical and problem-solving skills.
- Ability to communicate technical findings clearly.

Nice to have:
- Certifications such as Security+, BTL1, or SC-200.
- Familiarity with MITRE ATT&CK.
- Basic scripting knowledge in Python or PowerShell.
- Experience with endpoint detection and response solutions.
- Knowledge of cloud security concepts.

What we offer:
- Annual salary between €45,000 and €58,000.
- Hybrid working arrangement with 2 office days per week.
- 26 days of paid annual leave.
- Private health insurance.
- Annual certification and training budget.
- Flexible working hours.
- Modern security monitoring tools and equipment.
- Opportunities to specialize in threat hunting and incident response.
- Collaborative team with experienced cybersecurity professionals.`,
    notes: `- The SOC environment could be a great opportunity to develop practical security investigation skills.
- Salary is reasonable for my current experience level.
- I should review the MITRE ATT&CK framework before applying.
- Check whether the position involves night shifts or weekend rotations.
- Prepare examples of security investigations and suspicious log analysis.
- My networking fundamentals need some revision before a technical interview.
- Look into the company's main clients and the types of environments they protect.
- Ask which SIEM platform is used most frequently by the team.
- The certification budget is a significant advantage.
- Priority: High. Good opportunity to build a career in cybersecurity.`,
  },
  {
    company: "Nexora Technologies",
    position: "Technical Product Manager",
    location: "London, UK (Hybrid)",
    salary: [65000, 82000],
    url: "https://careers.nexora-technologies.com/technical-product-manager",
    tags: [
      "Full-time",
      "Permanent",
      "Product Management",
      "Technical Strategy",
      "Agile",
      "Scrum",
      "Jira",
      "Roadmapping",
      "SaaS",
      "API Design",
      "Stakeholder Management",
    ],
    description: `About Nexora Technologies

Nexora Technologies is a product-led software company building cloud-based platforms that help businesses automate their operations and improve productivity.

We are looking for a Technical Product Manager to join our product organization and drive the development of our core SaaS platform.

Your responsibilities:
- Define and communicate the product vision and technical roadmap.
- Gather requirements from customers, stakeholders, and internal teams.
- Translate business needs into detailed product specifications and user stories.
- Prioritize the product backlog based on business value and technical complexity.
- Work closely with engineering teams throughout the development lifecycle.
- Coordinate product releases and ensure successful feature delivery.
- Collaborate with UX/UI designers to improve the user experience.
- Analyze product usage metrics and identify opportunities for improvement.
- Communicate product strategy and progress to stakeholders.
- Balance technical constraints, customer expectations, and business objectives.

Requirements:
- 4+ years of experience in product management or technical project management.
- Strong understanding of software development processes.
- Experience working with engineering teams in an Agile environment.
- Familiarity with APIs, databases, cloud infrastructure, and SaaS architecture.
- Excellent communication and stakeholder management skills.
- Experience with product management tools such as Jira and Confluence.
- Ability to prioritize competing requirements and make data-driven decisions.
- Strong analytical thinking and problem-solving abilities.

Nice to have:
- Previous experience as a software developer or technical consultant.
- Knowledge of REST APIs and microservices architectures.
- Experience with product analytics tools such as Mixpanel or Amplitude.
- Familiarity with B2B SaaS business models.
- Experience managing products used by international customers.

What we offer:
- Annual salary between £65,000 and £82,000.
- Hybrid working arrangement with 2 office days per week.
- 27 days of paid annual leave plus public holidays.
- Private health insurance.
- Annual performance bonus.
- Professional development and leadership training budget.
- Flexible working hours.
- Company pension contributions.
- Modern office in central London.
- Opportunity to influence the strategic direction of a growing SaaS product.`,
    notes: `- This role is interesting because it combines technical knowledge with product strategy.
- My development background could be a strong advantage when communicating with engineering teams.
- Salary is attractive, but I need to evaluate the cost of living in London.
- The 4+ years of product management experience might be the biggest obstacle.
- I should highlight any experience involving feature prioritization, technical decisions, or project coordination.
- Review product discovery, roadmap planning, and prioritization frameworks such as RICE.
- Prepare an example of a project where I translated business requirements into technical specifications.
- Research the company's SaaS platform and identify potential product improvements.
- Ask how product success is measured and which KPIs the team follows.
- Priority: Medium. Interesting career direction, but my experience needs to match the product management requirements.`,
  },
  {
    company: "Meridian HealthTech",
    position: "Full Stack Software Engineer",
    location: "Copenhagen, Denmark (Hybrid)",
    salary: [58000, 72000],
    url: "https://careers.meridianhealthtech.com/full-stack-engineer",
    tags: [
      "Full-time",
      "Permanent",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "AWS",
      "Healthcare",
      "SaaS",
    ],
    description: `About Meridian HealthTech

Meridian HealthTech is an ambitious healthcare technology company building digital solutions that help healthcare professionals manage patient information, streamline administrative workflows, and improve the quality of care.

We are expanding our engineering team and looking for a Full Stack Software Engineer who enjoys solving complex technical problems and building products with a meaningful impact.

Your responsibilities:
- Develop and maintain web applications using React, Next.js, and TypeScript.
- Design and implement backend services using Node.js and NestJS.
- Build and maintain REST APIs for internal and external integrations.
- Design efficient database schemas using PostgreSQL and Prisma.
- Implement secure authentication and authorization mechanisms.
- Ensure compliance with data protection and security requirements.
- Collaborate with product managers, designers, and other engineers.
- Write automated tests and participate in code reviews.
- Monitor application performance and improve system reliability.
- Contribute to architectural decisions and engineering best practices.

Requirements:
- 4+ years of professional software development experience.
- Strong knowledge of TypeScript, React, and Node.js.
- Experience with modern backend frameworks such as NestJS.
- Good understanding of relational databases and API design.
- Familiarity with AWS and containerized applications.
- Knowledge of software security and data privacy principles.
- Experience working in an agile development environment.
- Excellent communication and problem-solving skills.

Nice to have:
- Previous experience in healthcare technology or fintech.
- Knowledge of healthcare data standards such as HL7 or FHIR.
- Familiarity with infrastructure as code.
- Experience building applications handling sensitive information.

What we offer:
- Annual salary between €58,000 and €72,000.
- Hybrid working arrangement with 2 office days per week.
- 30 days of paid annual leave.
- Private health insurance.
- Annual performance bonus.
- Pension contribution.
- €2,000 yearly professional development budget.
- Relocation assistance for international candidates.
- Flexible working hours.
- Opportunity to contribute to meaningful healthcare innovations.`,
    notes: `- The compensation package is attractive and within my expectations.
- The React, Next.js, and NestJS stack is a very good match for my technical background.
- Healthcare technology is an interesting industry that I would like to explore.
- I should research HL7 and FHIR before the technical interview.
- Need to clarify whether previous healthcare experience is actually mandatory.
- Ask whether relocation assistance covers temporary accommodation.
- Check the company's data protection practices and engineering culture.
- Prepare examples of projects involving authentication, authorization, and sensitive data.
- Find out how technical responsibilities are divided between frontend and backend engineers.
- Priority: High. Strong opportunity with good long-term career potential.`,
  },
  {
    company: "Orbit Technologies",
    position: "DevOps Engineer",
    location: "Munich, Germany (Hybrid)",
    salary: [60000, 75000],
    url: "https://careers.orbit-technologies.io/devops-engineer",
    tags: [
      "Full-time",
      "Permanent",
      "DevOps",
      "AWS",
      "Kubernetes",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "Monitoring",
      "Infrastructure as Code",
    ],
    description: `About Orbit Technologies

Orbit Technologies is a software engineering company helping businesses modernize their infrastructure and accelerate their digital transformation. We build reliable cloud-native platforms and provide scalable infrastructure solutions for companies operating across multiple industries.

We are currently looking for a DevOps Engineer to strengthen our infrastructure team and improve the reliability, security, and scalability of our cloud environments.

Your responsibilities:
- Design, implement, and maintain cloud infrastructure using AWS.
- Automate infrastructure provisioning and management with Terraform.
- Manage containerized applications using Docker and Kubernetes.
- Build and maintain CI/CD pipelines using GitHub Actions.
- Monitor infrastructure performance, availability, and reliability.
- Implement logging, monitoring, and alerting solutions.
- Improve deployment processes and infrastructure security.
- Collaborate with software engineers to optimize application delivery.
- Troubleshoot production incidents and identify root causes.
- Document infrastructure architecture and operational procedures.

Requirements:
- 3+ years of experience in DevOps or cloud infrastructure engineering.
- Strong knowledge of AWS services and cloud architecture.
- Hands-on experience with Docker and Kubernetes.
- Experience with Terraform or other infrastructure-as-code tools.
- Good understanding of CI/CD pipelines.
- Comfortable working with Linux environments and scripting.
- Knowledge of networking, security, and monitoring principles.
- Strong troubleshooting and problem-solving abilities.

Nice to have:
- AWS certifications.
- Experience with Prometheus and Grafana.
- Knowledge of Python or Bash scripting.
- Experience managing production environments at scale.
- Familiarity with GitOps practices and ArgoCD.

What we offer:
- Annual salary between €60,000 and €75,000.
- Hybrid working arrangement with 2 days per week in the office.
- 28 days of paid annual leave.
- Annual performance bonus of up to 10%.
- Private health insurance.
- Company-sponsored training and certifications.
- Relocation assistance for international candidates.
- Flexible working hours.
- Modern equipment and home office allowance.
- Opportunities to work on large-scale cloud infrastructure projects.`,
    notes: `- Salary is attractive and slightly above my current target.
- The AWS and Kubernetes requirements are interesting, but I need to assess my practical experience with both.
- Terraform is a skill I should highlight more prominently on my CV.
- Check whether AWS certifications are expected or simply considered a bonus.
- Prepare examples of CI/CD pipelines and infrastructure automation projects.
- Review Kubernetes concepts before a potential technical interview.
- Ask about the team's on-call rotation and incident management process.
- Find out how much of the infrastructure is already automated.
- The hybrid arrangement seems reasonable, but relocation to Munich would need consideration.
- Priority: Medium. Interesting opportunity, although I need to evaluate the technical requirements carefully.`,
  },
  {
    company: "Skyward Cloud Solutions",
    position: "Cloud Solutions Architect",
    location: "Zurich, Switzerland (Hybrid)",
    salary: [95000, 120000],
    url: "https://careers.skywardcloud.ch/cloud-solutions-architect",
    tags: [
      "Full-time",
      "Permanent",
      "Cloud Computing",
      "AWS",
      "Azure",
      "GCP",
      "Terraform",
      "Kubernetes",
      "Microservices",
      "System Design",
      "Infrastructure as Code",
    ],
    description: `About Skyward Cloud Solutions

Skyward Cloud Solutions is a technology consulting company helping organizations design, build, and modernize their cloud infrastructure. We work with international clients across finance, healthcare, retail, and telecommunications.

We are looking for an experienced Cloud Solutions Architect to lead cloud architecture initiatives and help our clients build secure, scalable, and cost-efficient infrastructure.

Your responsibilities:
- Design cloud architectures based on business and technical requirements.
- Define infrastructure strategies across AWS, Azure, and Google Cloud.
- Lead cloud migration and modernization projects.
- Design scalable and resilient distributed systems.
- Establish infrastructure standards and architectural best practices.
- Work with engineering teams to implement cloud-native solutions.
- Define security, networking, and identity management strategies.
- Optimize cloud infrastructure costs and resource utilization.
- Review technical designs and provide architectural guidance.
- Present architecture proposals to technical and business stakeholders.

Requirements:
- 5+ years of experience in cloud engineering or infrastructure architecture.
- Strong experience with at least one major cloud provider.
- Good understanding of networking, security, and distributed systems.
- Hands-on experience with Terraform and infrastructure automation.
- Knowledge of Kubernetes and container orchestration.
- Experience designing highly available production environments.
- Strong communication and stakeholder management skills.
- Ability to translate business requirements into technical solutions.

Nice to have:
- AWS Solutions Architect or Azure Solutions Architect certification.
- Experience with multi-cloud architectures.
- Knowledge of FinOps practices.
- Familiarity with event-driven architectures.
- Experience leading large-scale cloud migration projects.

What we offer:
- Annual salary between CHF 95,000 and CHF 120,000.
- Hybrid working arrangement with 2 office days per week.
- 25 days of paid annual leave.
- Annual performance bonus.
- Comprehensive health insurance package.
- Pension contribution.
- Professional certification budget.
- Relocation assistance for international candidates.
- Flexible working hours.
- Opportunity to work on large-scale international cloud projects.`,
    notes: `- Excellent salary range, although the cost of living in Zurich needs to be considered.
- The architectural responsibilities are interesting, but this is clearly a senior-level position.
- I should evaluate whether my experience is sufficient for the 5+ years requirement.
- AWS certification could strengthen my application.
- Prepare examples of cloud migration projects and architectural decisions.
- Review multi-cloud strategies, networking, and disaster recovery concepts.
- Ask how much time is spent on hands-on implementation versus architecture consulting.
- Check whether relocation assistance includes support with finding accommodation.
- Research the company's main clients and recent cloud transformation projects.
- Priority: Medium. Attractive opportunity, but potentially a stretch given the seniority.`,
  },
  {
    company: "PocketWave",
    position: "Mobile Application Developer (React Native)",
    location: "Paris, France (Hybrid)",
    salary: [43000, 55000],
    url: "https://careers.pocketwave.io/mobile-developer",
    tags: [
      "Full-time",
      "Permanent",
      "React Native",
      "TypeScript",
      "JavaScript",
      "iOS",
      "Android",
      "Expo",
      "Redux Toolkit",
      "REST API",
      "Firebase",
      "Mobile Development",
    ],
    description: `About PocketWave

PocketWave is a fast-growing technology startup developing innovative mobile applications that help people manage their everyday activities. Our products are used by thousands of customers across Europe, and we are continuously expanding our mobile engineering team.

We are looking for a Mobile Application Developer to build and maintain high-quality applications for iOS and Android.

Your responsibilities:
- Develop cross-platform mobile applications using React Native and TypeScript.
- Build reusable components and maintain a scalable mobile architecture.
- Integrate REST APIs and third-party services.
- Implement authentication, push notifications, and deep linking.
- Optimize application performance and improve user experience.
- Collaborate with product designers to implement Figma prototypes.
- Debug and resolve issues across different devices and operating systems.
- Write unit and integration tests for critical application features.
- Participate in code reviews and technical discussions.
- Contribute to publishing and maintaining applications on the App Store and Google Play.

Requirements:
- 2+ years of professional mobile development experience.
- Strong knowledge of React Native and TypeScript.
- Experience with React and modern JavaScript.
- Good understanding of iOS and Android development environments.
- Familiarity with REST APIs and asynchronous data management.
- Experience with Git and collaborative development workflows.
- Understanding of mobile performance and accessibility.
- Ability to work independently and collaboratively.

Nice to have:
- Experience with Expo and Expo Application Services.
- Knowledge of native iOS development with Swift.
- Knowledge of native Android development with Kotlin.
- Experience with Firebase and push notification services.
- Familiarity with automated mobile testing tools.
- Previous experience publishing applications to app stores.

What we offer:
- Annual salary between €43,000 and €55,000.
- Hybrid working arrangement with 2 office days per week.
- 27 days of paid annual leave.
- Private health insurance.
- Annual learning and development budget.
- Latest MacBook and mobile testing devices.
- Flexible working hours.
- Monthly team events and collaborative workshops.
- Opportunity to work on mobile products with a growing international user base.`,
    notes: `- Very interesting opportunity because React Native and TypeScript match my development interests.
- I should showcase at least one complete mobile application in my portfolio.
- Need to review Expo EAS, app signing, and deployment workflows.
- Prepare examples of API integration, authentication, and push notifications.
- Check whether the team uses Expo managed workflow or bare React Native.
- Ask how much native iOS and Android knowledge is expected in practice.
- I should test my portfolio application on both physical iOS and Android devices.
- Find out whether developers are involved in the App Store submission process.
- Salary is reasonable, but I should negotiate closer to €52k depending on the interview.
- Priority: High. This is exactly the kind of mobile development opportunity I want to explore.`,
  },
];

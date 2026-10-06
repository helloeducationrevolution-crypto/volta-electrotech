import { useEffect, useState } from "react";



import "./App.css";







const products = [



  {



    number: "01",



    code: "PLC",



    title: "PLC Automation Panels",



    description:



      "PLC based control systems engineered for machine automation, sequencing, monitoring and industrial process control.",



    features: [



      "PLC based machine control",



      "Digital and analog I/O integration",



      "Sensor and field device integration",



      "VFD and servo drive control",



      "HMI communication",



      "Industrial communication",



    ],



    applications: [



      "Machine automation",



      "Process control",



      "Water and chiller systems",



      "Production machinery",



    ],



  },



  {



    number: "02",



    code: "VFD",



    title: "VFD Control Panels",



    description:



      "Variable speed drive panels designed for controlled motor operation, process regulation and industrial applications.",



    features: [



      "Variable frequency drive control",



      "Motor speed regulation",



      "Auto and manual operation",



      "Motor protection and control",



      "PLC and HMI integration",



      "Process based speed control",



    ],



    applications: [



      "Pumps",



      "Fans and blowers",



      "Conveyors",



      "Compressors",



      "Water treatment",



    ],



  },



  {



    number: "03",



    code: "MCC",



    title: "MCC Panels",



    description:



      "Motor control and power distribution panels developed for centralized industrial motor operation and protection.",



    features: [



      "Motor feeder sections",



      "DOL starters",



      "Star-delta starters",



      "VFD feeders",



      "Motor protection",



      "Control and indication",



    ],



    applications: [



      "Industrial plants",



      "Manufacturing facilities",



      "Water treatment plants",



      "Process industries",



    ],



  },



  {



    number: "04",



    code: "HMI",



    title: "HMI & SCADA",



    description:



      "Operator interface and monitoring systems providing clear visualization, alarms, parameters and machine status.",



    features: [



      "Machine visualization",



      "Real-time process monitoring",



      "Alarm management",



      "Parameter setting",



      "Trend and status display",



      "PLC communication",



    ],



    applications: [



      "Machine control",



      "Production monitoring",



      "Process automation",



      "Plant visualization",



    ],



  },



  {



    number: "05",



    code: "SERVO",



    title: "Servo Automation",



    description:



      "Precision motion control solutions for positioning, synchronization and high-speed automated machine applications.",



    features: [



      "Servo motor control",



      "High-speed pulse control",



      "Positioning applications",



      "Electronic gearing",



      "Cam and synchronized motion",



      "Encoder feedback",



    ],



    applications: [



      "Cutting machines",



      "Packaging machinery",



      "Feeding systems",



      "Indexing machines",



      "Precision automation",



    ],



  },



  {



    number: "06",



    code: "AUTO",



    title: "Custom Automation",



    description:



      "Complete automation engineering combining PLC, HMI, drives, servo systems, sensors and industrial communication.",



    features: [



      "Machine automation development",



      "PLC programming",



      "HMI development",



      "Drive integration",



      "Servo motion control",



      "Industrial communication",



    ],



    applications: [



      "Special purpose machines",



      "Production automation",



      "Process automation",



      "Machine retrofitting",



    ],



  },



];







const industries = [



  {



    number: "01",



    title: "Water & Chiller",



    text: "Automation and control systems for water handling, chilling and process applications.",



  },



  {



    number: "02",



    title: "Manufacturing",



    text: "Machine control and production automation for manufacturing environments.",



  },



  {



    number: "03",



    title: "Packaging",



    text: "Motion, drive and control solutions for automated packaging machinery.",



  },



  {



    number: "04",



    title: "Process Industry",



    text: "Electrical and automation systems for continuous and process-oriented applications.",



  },



];







function App() {



  const [selectedProduct, setSelectedProduct] = useState(null);



  const [menuOpen, setMenuOpen] = useState(false);



  const [requirementOpen, setRequirementOpen] = useState(false);



  const [requirementSubmitted, setRequirementSubmitted] = useState(null);
  const [requirementMessage, setRequirementMessage] = useState("");



const [requirementType, setRequirementType] = useState("new");



  const whatsappText = encodeURIComponent(



    "Hello Volta Electrotech, I have an industrial automation requirement."



  );







  useEffect(() => {



    const handleEscape = (event) => {



      if (event.key === "Escape") {



        setSelectedProduct(null);



        setMenuOpen(false);



      }



    };







    document.body.classList.toggle("modal-open", Boolean(selectedProduct));







    window.addEventListener("keydown", handleEscape);







    return () => {



      document.body.classList.remove("modal-open");



      window.removeEventListener("keydown", handleEscape);



    };



  }, [selectedProduct]);



const handleRequirementSubmit = (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const currentNumber = Number(localStorage.getItem("volta_requirement_number") || "0");
  const nextNumber = currentNumber + 1;
  localStorage.setItem("volta_requirement_number", String(nextNumber));

  const requirementId = `VE-REQ-${String(nextNumber).padStart(4, "0")}`;
  const lines = [
    "🔔 NEW INDUSTRIAL REQUIREMENT",
    "",
    `Requirement ID: ${requirementId}`,
    `Requirement Type: ${requirementType === "new" ? "New Panel / Automation Project" : "Existing Machine / Panel Problem"}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "CUSTOMER / PROJECT DETAILS",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
  ];

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    if (field.type === "file") {
      const files = Array.from(field.files || []);
      if (files.length) lines.push(`Files: ${files.map((file) => file.name).join(", ")}`);
      return;
    }
    const value = String(field.value || "").trim();
    if (!value) return;
    const wrapper = field.closest(".form-field");
    const label = wrapper?.querySelector("label")?.textContent?.replace(/\*/g, "").trim();
    if (label) lines.push(`${label}: ${value}`);
  });

  lines.push(
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "Please contact the customer for further discussion.",
    "━━━━━━━━━━━━━━━━━━━━"
  );

  setRequirementMessage(lines.join("\n"));
  setRequirementSubmitted(requirementId);
};



  const closeMenu = () => setMenuOpen(false);







  return (



    <div className="volta-site">



      <header className="navbar">



        <div className="nav-inner">



          <a href="#home" className="logo" onClick={closeMenu}>



            <img src="/volta-logo.png" alt="Volta Electrotech" />



          </a>







          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>



            <a href="#home" onClick={closeMenu}>Home</a>



            <a href="#about" onClick={closeMenu}>About</a>



            <a href="#products" onClick={closeMenu}>Products</a>



            <a href="#industries" onClick={closeMenu}>Industries</a>



            <a href="#contact" onClick={closeMenu}>Contact</a>



          </nav>







          <a href="#contact" className="nav-quote" onClick={closeMenu}>



            Get Quote <span>→</span>



          </a>







          <button



            className={`nav-toggle ${menuOpen ? "is-open" : ""}`}



            type="button"



            aria-label="Toggle navigation"



            aria-expanded={menuOpen}



            onClick={() => setMenuOpen((value) => !value)}



          >



            <span />



            <span />



            <span />



          </button>



        </div>



      </header>







      <main>



        <section id="home" className="hero">



          <div className="hero-grid" aria-hidden="true" />







          <div className="hero-container">



            <div className="hero-content">



              <div className="hero-eyebrow">



                <span className="eyebrow-line" />



                INDUSTRIAL AUTOMATION &amp; CONTROL



              </div>







              <h1 className="hero-title">



                <span>Engineering</span>



                <span>Intelligence</span>



                <span>For Industry</span>



              </h1>







              <p className="hero-description">



                Advanced PLC, VFD and automation panel solutions engineered



                for reliable industrial performance.



              </p>







              <div className="hero-actions">



                <a href="#products" className="btn-primary">



                  Explore Solutions <span>→</span>



                </a>



                <a href="#contact" className="btn-secondary">



                  Contact Engineering



                </a>



              </div>







              <div className="hero-stats">



                <div className="stat">



                  <strong>10+</strong>



                  <span>YEARS EXPERIENCE</span>



                </div>



                <div className="stat">



                  <strong>1000+</strong>



                  <span>AUTOMATION PROJECTS</span>



                </div>



                <div className="stat">



                  <strong>24/7</strong>



                  <span>TECHNICAL SUPPORT</span>



                </div>



              </div>



            </div>







            <div className="hero-visual">



              <div className="control-panel">



                <div className="control-header">



                  <div className="control-brand">



                    <span className="brand-mark">V</span>



                    <strong>VOLTA</strong>



                  </div>



                  <span className="system-online">



                    <i />



                    SYSTEM ONLINE



                  </span>



                </div>







                <div className="control-main">



                  <div className="control-topline">



                    <span>INDUSTRIAL CONTROL</span>



                    <span className="control-live">LIVE</span>



                  </div>







                  <div className="control-title">PLC</div>







                  <div className="control-chart" aria-hidden="true">



                    <span style={{ height: "32%" }} />



                    <span style={{ height: "48%" }} />



                    <span style={{ height: "40%" }} />



                    <span style={{ height: "70%" }} />



                    <span style={{ height: "57%" }} />



                    <span style={{ height: "88%" }} />



                    <span style={{ height: "66%" }} />



                    <span style={{ height: "92%" }} />



                  </div>







                  <div className="control-status">



                    <span>CONTROL</span>



                    <strong>ACTIVE</strong>



                  </div>



                </div>







                <div className="control-footer">



                  <div>



                    <span>POWER</span>



                    <strong>24V DC</strong>



                  </div>



                  <div>



                    <span>SUPPLY</span>



                    <strong>380V AC</strong>



                  </div>



                  <div>



                    <span>MODE</span>



                    <strong>AUTO</strong>



                  </div>



                </div>



              </div>







              <div className="visual-caption">



                <span>01</span>



                INDUSTRIAL CONTROL SYSTEM



              </div>



            </div>



          </div>



        </section>







        <section id="about" className="section about-section">



          <div className="section-container">



            <div className="section-heading light-heading">



              <div className="section-eyebrow">ABOUT VOLTA ELECTROTECH</div>



              <h2>Engineered for Performance</h2>



              <p>



                Industrial automation solutions designed around reliability,



                precision and long-term performance.



              </p>



            </div>







            <div className="about-grid">



              <article className="about-card">



                <div className="about-number">01</div>



                <h3>Engineering</h3>



                <p>



                  Practical electrical and automation engineering focused on



                  reliable machine operation and clean control architecture.



                </p>



              </article>







              <article className="about-card">



                <div className="about-number">02</div>



                <h3>Automation</h3>



                <p>



                  PLC, HMI, VFD, servo and industrial control solutions



                  developed around individual machine requirements.



                </p>



              </article>







              <article className="about-card">



                <div className="about-number">03</div>



                <h3>Reliability</h3>



                <p>



                  Control systems designed with protection, maintainability



                  and dependable industrial performance in mind.



                </p>



              </article>



            </div>



          </div>



        </section>







        <section id="products" className="section products-section">



          <div className="section-container">



            <div className="section-heading dark-heading">



              <div className="section-eyebrow">OUR SOLUTIONS</div>



              <h2>Automation &amp; Control Systems</h2>



              <p>



                Complete industrial electrical and automation solutions



                engineered for reliable machine performance.



              </p>



            </div>







            <div className="products-grid">



              {products.map((product) => (



                <article className="product-card" key={product.code}>



                  <div className="product-card-top">



                    <span>{product.number}</span>



                    <small>{product.code}</small>



                  </div>







                  <h3>{product.title}</h3>



                  <p>{product.description}</p>







                  <button



                    className="learn-more"



                    type="button"



                    onClick={() => setSelectedProduct(product)}



                  >



                    Learn More <span>→</span>



                  </button>



                </article>



              ))}



            </div>



          </div>



        </section>







        <section id="industries" className="section industries-section">



          <div className="section-container">



            <div className="section-heading light-heading">



              <div className="section-eyebrow">INDUSTRIES WE SERVE</div>



              <h2>Automation Across Industries</h2>



              <p>



                Control and automation solutions for demanding industrial



                applications.



              </p>



            </div>







            <div className="industries-grid">



              {industries.map((industry) => (



                <article className="industry-card" key={industry.number}>



                  <span>{industry.number}</span>



                  <h3>{industry.title}</h3>



                  <p>{industry.text}</p>



                </article>



              ))}



            </div>



          </div>



        </section>



        {/* INDUSTRY REQUIREMENT */}



<section className="requirement-section" id="requirement">



  <div className="section-container">



    <div className="requirement-box">







      <div className="requirement-content">



        <div className="section-eyebrow">



          INDUSTRIAL ENGINEERING SUPPORT



        </div>







        <h2>



          Industrial Problem?



          <br />



          <span>Let Our Engineers Solve It.</span>



        </h2>







        <p>



          Tell us about your machine, panel or automation requirement.



          You can share your technical details, drawings, photos,



          PLC program or machine video with our engineering team.



        </p>







        <div className="requirement-points">



          <div>✓ New Panel / Automation Project</div>



          <div>✓ Existing Machine Problem</div>



          <div>✓ PLC / VFD / Servo / HMI Solution</div>



          <div>✓ Engineering Support &amp; Technical Analysis</div>



        </div>







        <div className="requirement-actions">



          <button



  onClick={() => {

                      setRequirementSubmitted(null);

                      setRequirementOpen(true);

                    }}



>



  Submit Your Requirement →



</button>







          <a



            href="https://wa.me/919725325363"



            target="_blank"



            rel="noreferrer"



            className="secondary-btn"



          >



            Talk to an Engineer



          </a>



        </div>



      </div>







      <div className="requirement-visual">



        <div className="requirement-status">



          <span className="status-light"></span>



          ENGINEERING SUPPORT



        </div>







        <div className="requirement-display">



          <div className="display-label">PROJECT ANALYSIS</div>



          <div className="display-value">READY</div>



          <div className="display-line"></div>







          <div className="requirement-items">



            <span>PLC</span>



            <span>VFD</span>



            <span>SERVO</span>



            <span>HMI</span>



          </div>



        </div>



      </div>







    </div>



  </div>



</section>







        <section id="contact" className="section contact-section">



          <div className="section-container">



            <div className="section-heading light-heading">



              <div className="section-eyebrow">GET IN TOUCH</div>



              <h2>Let's Engineer Your Solution</h2>



              <p>



                Tell us about your machine, process or automation requirement



                and our engineering team will help.



              </p>



            </div>







            <div className="contact-layout">



              <div className="contact-details">



                <div className="contact-row">



                  <span>PHONE</span>



                  <a href="tel:+919725325363">+91 97253 25363</a>



                </div>







                <div className="contact-row">



                  <span>WHATSAPP</span>



                  <a



                    href={`https://wa.me/919725325363?text=${whatsappText}`}



                    target="_blank"



                    rel="noreferrer"



                  >



                    +91 97253 25363



                  </a>



                </div>







                <div className="contact-row">



                  <span>EMAIL</span>



                  <a href="mailto:volta.electrotech@outlook.com">



                    volta.electrotech@outlook.com



                  </a>



                </div>







                <div className="contact-row">



                  <span>ADDRESS</span>



                  <p>



                    Plot No. 177, Krishna Signature Mall,



                    <br />



                    First Floor, Shop No. F-28,



                    <br />



                    Station Main Road, Umbergaon,



                    <br />



                    Dist. Valsad, Gujarat - 396171



                  </p>



                </div>



              </div>







              <div className="enquiry-box">



                <div className="enquiry-label">PROJECT ENQUIRY</div>



                <h3>Have a machine or automation requirement?</h3>



                <p>



                  Share your requirement with our engineering team for PLC,



                  VFD, servo, HMI or complete automation solutions.



                </p>







                <div className="enquiry-actions">



                  <a



                    href={`https://wa.me/919725325363?text=${whatsappText}`}



                    target="_blank"



                    rel="noreferrer"



                    className="btn-primary"



                  >



                    WhatsApp Engineering <span>→</span>



                  </a>







                  <a



                    href="mailto:volta.electrotech@outlook.com?subject=Project%20Enquiry%20-%20Volta%20Electrotech"



                    className="btn-secondary"



                  >



                    Send Email



                  </a>



                </div>



              </div>



            </div>



          </div>



        </section>



      </main>







      <footer className="footer">



        <div className="footer-container">



          <div className="footer-brand">



            <strong>VOLTA ELECTROTECH</strong>



            <p>Industrial Automation • PLC • VFD • Electrical Panels</p>



          </div>







          <div className="footer-links">



            <a href="tel:+919725325363">+91 97253 25363</a>



            <a href="mailto:volta.electrotech@outlook.com">



              volta.electrotech@outlook.com



            </a>



          </div>







          <div className="copyright">



            © 2026 Volta Electrotech. All rights reserved.



          </div>



        </div>



      </footer>







      <a



        href={`https://wa.me/919725325363?text=${whatsappText}`}



        target="_blank"



        rel="noreferrer"



        className="whatsapp-float"



        aria-label="WhatsApp"



      >



        WA



      </a>







      {selectedProduct && (



        <div



          className="modal-overlay"



          role="presentation"



          onMouseDown={(event) => {



            if (event.target === event.currentTarget) {



              setSelectedProduct(null);



            }



          }}



        >



          <div



            className="product-modal"



            role="dialog"



            aria-modal="true"



            aria-labelledby="product-modal-title"



          >



            <button



              className="modal-close"



              type="button"



              aria-label="Close product details"



              onClick={() => setSelectedProduct(null)}



            >



              ×



            </button>







            <div className="modal-code">



              {selectedProduct.number} / {selectedProduct.code}



            </div>







            <h2 id="product-modal-title">{selectedProduct.title}</h2>







            <p className="modal-description">



              {selectedProduct.description}



            </p>







            <div className="modal-columns">



              <div>



                <div className="modal-label">CORE CAPABILITIES</div>



                <ul>



                  {selectedProduct.features.map((item) => (



                    <li key={item}>



                      <span>+</span>



                      {item}



                    </li>



                  ))}



                </ul>



              </div>







              <div>



                <div className="modal-label">APPLICATIONS</div>



                <ul>



                  {selectedProduct.applications.map((item) => (



                    <li key={item}>



                      <span>+</span>



                      {item}



                    </li>



                  ))}



                </ul>



              </div>



            </div>







            <div className="modal-bottom">



              <div>



                <strong>Need a solution for your machine?</strong>



                <span>Talk to our engineering team.</span>



              </div>







              <a



                href={`https://wa.me/919725325363?text=${encodeURIComponent(



                  `Hello Volta Electrotech, I need an enquiry for ${selectedProduct.title}.`



                )}`}



                target="_blank"



                rel="noreferrer"



                className="btn-primary"



              >



                Get Project Enquiry <span>→</span>



              </a>



            </div>



          </div>



        </div>



      )}



            {requirementOpen && (



        <div



          className="requirement-modal-overlay"



          onClick={() => setRequirementOpen(false)}



        >



          <div



            className="requirement-modal"



            onClick={(event) => event.stopPropagation()}



            >

            {requirementSubmitted ? (



  <div className="requirement-success-screen">



    <div className="success-icon">✓</div>







    <div className="requirement-modal-eyebrow">



      REQUIREMENT RECEIVED



    </div>







    <h2>Requirement Submitted Successfully</h2>







    <p>



      Thank you for sharing your industrial requirement.



      Our engineering team will review the details and contact you shortly.



    </p>







    <div className="success-requirement-id">



      <span>REQUIREMENT ID</span>



      <strong>{requirementSubmitted}</strong>



    </div>







    <div className="success-actions">



      <button
        type="button"
        className="primary-btn"
        onClick={() => {
          window.open(
            `https://wa.me/919725325363?text=${encodeURIComponent(requirementMessage)}`,
            "_blank"
          );
        }}
      >
        Talk to Engineer →
      </button>







      <button



        type="button"



        className="secondary-btn"



        onClick={() => {



          setRequirementSubmitted(null);



          setRequirementOpen(false);



        }}



      >



        Close



      </button>



    </div>

  </div>

            ) : (

              <>

            <div className="requirement-modal-header">



              <div>



                <div className="requirement-modal-eyebrow">



                  INDUSTRIAL ENGINEERING



                </div>







                <h2>Submit Your Requirement</h2>







                <p>



                  Tell us about your new panel, machine or automation



                  requirement.



                </p>



              </div>







              <button



                type="button"



                className="requirement-close"



                onClick={() => setRequirementOpen(false)}



                aria-label="Close"



              >



                ×



              </button>



            </div>







            <div className="requirement-choice-grid">



              <button



  type="button"



  className={`requirement-choice ${



    requirementType === "new" ? "active" : ""



  }`}



  onClick={() => setRequirementType("new")}



>



                <span className="choice-number">01</span>



                <strong>New Panel / Automation Project</strong>



                <small>



                  Need a new electrical panel, PLC, VFD, servo or complete



                  automation solution.



                </small>



              </button>







              <button



  type="button"



  className={`requirement-choice ${



    requirementType === "problem" ? "active" : ""



  }`}



  onClick={() => setRequirementType("problem")}



>



                <span className="choice-number">02</span>



                <strong>Existing Machine / Panel Problem</strong>



                <small>



                  Facing a machine, PLC, drive, electrical or automation



                  problem.



                </small>



              </button>



            </div>







            <form id="requirement-form" onSubmit={handleRequirementSubmit}>



            {requirementType === "new" && (



            <div className="requirement-form-grid">







              <div className="form-field">



                <label>Company Name *</label>



                <input



                  type="text"



                  placeholder="Enter company name"  required />



              </div>











              <div className="form-field">



                <label>Contact Person *</label>



                <input



                  type="text"



                  placeholder="Enter contact person"  required />



              </div>







              <div className="form-field">



                <label>Mobile / WhatsApp *</label>



                <input



                  type="tel"



                  placeholder="+91 XXXXX XXXXX"  required />



              </div>







              <div className="form-field">



                <label>Email</label>



                <input



                  type="email"



                  placeholder="company@email.com"



                />



              </div>







              <div className="form-field">



                <label>Industry Type</label>



                <select defaultValue="">



                  <option value="" disabled>



                    Select industry



                  </option>



                  <option>Manufacturing</option>



                  <option>Packaging</option>



                  <option>Water & Chiller</option>



                  <option>Process Industry</option>



                  <option>Textile</option>



                  <option>Pharma</option>



                  <option>Chemical</option>



                  <option>Food</option>



                  <option>Other</option>



                </select>



              </div>







              <div className="form-field">



                <label>Machine / Application Name *</label>



                <input



                  type="text"



                  placeholder="Example: Paper Cutting Machine"  required />



              </div>







              <div className="form-field full-width">



                <label>What do you want to build? *</label>



                <select defaultValue="" required>



                  <option value="" disabled>



                    Select requirement



                  </option>



                  <option>New Electrical Panel</option>



                  <option>PLC Automation Panel</option>



                  <option>VFD Control Panel</option>



                  <option>MCC Panel</option>



                  <option>Servo / Motion Control Panel</option>



                  <option>HMI / SCADA</option>



                  <option>Complete Machine Automation</option>



                  <option>Panel Modification / Retrofit</option>



                  <option>Other</option>



                </select>



              </div>







              <div className="form-field">



                <label>PLC Requirement</label>



                <select defaultValue="">



                  <option value="" disabled>



                    Select PLC



                  </option>



                  <option>Mitsubishi</option>



                  <option>Delta</option>



                  <option>Siemens</option>



                  <option>Kinco</option>



                  <option>Schneider</option>



                  <option>Not Sure</option>



                </select>



              </div>







              <div className="form-field">



                <label>HMI Requirement</label>



                <select defaultValue="">



                  <option value="" disabled>



                    Select HMI



                  </option>



                  <option>4.3 Inch</option>



                  <option>7 Inch</option>



                  <option>10 Inch</option>



                  <option>Not Sure</option>



                </select>



              </div>







              <div className="form-field">



                <label>Drive Requirement</label>



                <select defaultValue="">



                  <option value="" disabled>



                    Select drive



                  </option>



                  <option>VFD</option>



                  <option>Servo</option>



                  <option>VFD + Servo</option>



                  <option>Not Required</option>



                  <option>Not Sure</option>



                </select>



              </div>







              <div className="form-field">



                <label>Motor Details</label>



                <input



                  type="text"



                  placeholder="Example: 20 HP, 415V, 1440 RPM"



                />



              </div>







              <div className="form-field">



                <label>Number of Motors</label>



                <input



                  type="number"



                  min="0"



                  placeholder="Enter quantity"



                />



              </div>







              <div className="form-field">



                <label>Sensors / Encoder</label>



                <input



                  type="text"



                  placeholder="Example: Proximity, PT100, Encoder"



                />



              </div>







              <div className="form-field">



                <label>Communication Requirement</label>



                <select defaultValue="">



                  <option value="" disabled>



                    Select communication



                  </option>



                  <option>Ethernet</option>



                  <option>RS485 / Modbus</option>



                  <option>EtherCAT</option>



                  <option>Profinet</option>



                  <option>Not Sure</option>



                </select>



              </div>







              <div className="form-field full-width">



                <label>Requirement Description *</label>



                <textarea



                  rows="5"



                  placeholder="Describe your machine, process or automation requirement..."

                  required



                ></textarea>



              </div>







              <div className="form-field full-width">



                <label>Upload Technical Documents</label>







                <div className="upload-box">



                  <input



                    type="file"



                    multiple



                    accept=".pdf,.jpg,.jpeg,.png,.mp4,.zip,.rar,.xlsx,.xls,.dwg"



                  />







                  <div className="upload-content">



                    <strong>Upload drawings, photos, video or PLC program</strong>



                    <span>



                      PDF, JPG, PNG, MP4, ZIP, Excel and CAD files



                    </span>



                  </div>



                </div>



              </div>







              <div className="form-field full-width">



                <label>Additional Notes</label>



                <textarea



                  rows="3"



                  placeholder="Anything else our engineers should know?"



                ></textarea>



              </div>







            </div>



)}



{requirementType === "problem" && (



  <div className="requirement-form-grid">







    <div className="form-field">



      <label>Company Name *</label>



      <input



        type="text"



        placeholder="Enter company name"



       required />



    </div>







    <div className="form-field">



      <label>Contact Person *</label>



      <input



        type="text"



        placeholder="Enter contact person"



       required />



    </div>







    <div className="form-field">



      <label>Mobile / WhatsApp *</label>



      <input



        type="tel"



        placeholder="+91 XXXXX XXXXX"



       required />



    </div>







    <div className="form-field">



      <label>Email</label>



      <input



        type="email"



        placeholder="company@email.com"



      />



    </div>







    <div className="form-field">



      <label>Machine / Application Name *</label>



      <input



        type="text"



        placeholder="Example: Paper Cutting Machine"



       required />



    </div>







    <div className="form-field">



      <label>Machine Make / Model</label>



      <input



        type="text"



        placeholder="Enter machine make / model"



      />



    </div>







    <div className="form-field">



      <label>PLC Make</label>



      <select defaultValue="">



        <option value="" disabled>



          Select PLC



        </option>



        <option>Mitsubishi</option>



        <option>Delta</option>



        <option>Siemens</option>



        <option>Kinco</option>



        <option>Schneider</option>



        <option>Other</option>



        <option>Not Sure</option>



      </select>



    </div>







    <div className="form-field">



      <label>VFD / Servo Make</label>



      <input



        type="text"



        placeholder="Example: Mitsubishi / Innovance / INVT"



      />



    </div>







    <div className="form-field full-width">



      <label>Problem Category *</label>



      <select defaultValue="" required>



        <option value="" disabled>



          Select problem category



        </option>



        <option>Machine Not Running</option>



        <option>PLC Problem</option>



        <option>VFD / Drive Problem</option>



        <option>Servo / Motion Problem</option>



        <option>Sensor Problem</option>



        <option>Electrical Problem</option>



        <option>Communication Problem</option>



        <option>Other</option>



      </select>



    </div>







    <div className="form-field">



      <label>Error Code</label>



      <input



        type="text"



        placeholder="Example: E.OC / AL.030 / Error 740"



      />



    </div>







    <div className="form-field">



      <label>Machine Status</label>



      <select defaultValue="">



        <option value="" disabled>



          Select machine status



        </option>



        <option>Running</option>



        <option>Partially Running</option>



        <option>Completely Stopped</option>



      </select>



    </div>







    <div className="form-field">



      <label>Problem Since</label>



      <select defaultValue="">



        <option value="" disabled>



          Select duration



        </option>



        <option>Today</option>



        <option>1–7 Days</option>



        <option>1–4 Weeks</option>



        <option>More than 1 Month</option>



      </select>



    </div>







    <div className="form-field">



      <label>Machine Production Impact</label>



      <select defaultValue="">



        <option value="" disabled>



          Select impact



        </option>



        <option>Production Completely Stopped</option>



        <option>Production Reduced</option>



        <option>Minor Issue</option>



        <option>No Production Impact</option>



        <option>Not Sure</option>



      </select>



    </div>







    <div className="form-field full-width">



      <label>Describe the Problem *</label>



      <textarea



        rows="6"



        placeholder="Explain the problem in your own words. Tell us what happens when you start the machine, what stops working, any abnormal sound/message, and what you have already tried..."

        required



      ></textarea>



    </div>







    <div className="form-field full-width">



      <label>Upload Problem Photos / Video / PLC Program / Drawing</label>







      <div className="upload-box">



        <input



          type="file"



          multiple



          accept=".pdf,.jpg,.jpeg,.png,.mp4,.zip,.rar,.xlsx,.xls,.dwg"



        />







        <div className="upload-content">



          <strong>



            Upload photos, machine video, PLC program or electrical drawing



          </strong>







          <span>



            PDF, JPG, PNG, MP4, ZIP, Excel and CAD files



          </span>



        </div>



      </div>



    </div>







    <div className="form-field full-width">



      <label>Additional Notes</label>







      <textarea



        rows="4"



        placeholder="Anything else our engineers should know?"



      ></textarea>



    </div>







  </div>



)}



            <div className="requirement-engineer-note">



              <span>✓</span>



              Not sure about the technical specification?



              <strong> Our engineers can help you select the right solution.</strong>



            </div>







            <div className="requirement-form-footer">



              <button



                type="button"



                className="secondary-btn"



                onClick={() => setRequirementOpen(false)}



              >



                Cancel



              </button>







              <button



  type="submit"



  className="primary-btn"



>



  Submit Requirement →



</button>



            </div>



            </form>

              </>

            )}

          </div>

        </div>

      )}

    </div>

  );



}







export default App;

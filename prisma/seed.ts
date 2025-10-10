const { PrismaClient, Department, PatentStatus } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const faculty = await prisma.faculty.create({
    data: {
      name: "Dr. L. Murali",
      department: Department.ECE,
      joiningYear: 2009,
      qualification: "Ph.D",
      phone: "9894095747",
      email: "murlak37@gmail.com",
      googleScholar: "https://scholar.google.com/citations?hl=en-US&user=JimWTQsAAAAJ",
      scopusUrl: "https://www.scopus.com/authid/detail.uri?authorId=57163542100",
      webOfScience: "https://www.webofscience.com/wos/author/record/K-3359-2016",

      journals: {
        create: [
          {
            authorName: "J. Siddaiyan, K. Ponnusamy, L. Murali",
            paperTitle:
              "Advancements in Traffic Sign Recognition for Autonomous Vehicles Using DCGAIN and Template Matching",
            journalName:
              "Journal of Transportation Engineering, Part A: Systems",
            doi: "https://doi.org/10.1061/JTEPBS.TEENG-8872",
            indexedIn: "SCI, SCOPUS",
            impactFactor: 3.5,
            year: 2025,
          },
          {
            authorName: "N. Paramesh Kumar, S. Vijayabaskar, L. Murali",
            paperTitle:
              "Seagull optimization based deep belief network model for biofuel production",
            journalName: "Environ Prog Sustainable Energy",
            doi: "10.1002/ep.14573",
            issn: "1944-7450",
            indexedIn: "SCI, SCOPUS",
            impactFactor: 2.7,
            year: 2025,
          },
          {
            authorName: "L.Murali, S Sasikala, Meera Devi T",
            paperTitle:
              "Lung cancer detection with machine learning classifiers with multi-attribute decision-making system and deep learning model",
            journalName: "Scientific Reports",
            doi: "10.1038/s41598-025-88188-w",
            issn: "2045-2322",
            indexedIn: "SCI, SCOPUS",
            year: 2025,
          },
          {
            authorName: "Jayalakshmi D, Hemavathi R, Murali L, Baskar Duraisamy, Banda SNV Ramana Murthy and Sunita",
            paperTitle:
              "A Novel DC-GCN with Attention Mechanism for Accurate Near-Duplicate Video Data Cleaning",
            journalName: "Journal of Machine and Computing",
            doi: "https://doi.org/10.53759/7669/jmc202404093",
            issn: "2788-7669",
            indexedIn: "SCOPUS",
            year: 2024,
          },
          {
            authorName: "KS Neelu Kumari, L Murali, S Vijayabaskar, R Gopalakrishnan",
            paperTitle:
              "A Reconfigured Architecture of Mathematical Morphology Using Fuzzy Logic Controller for ECG QRS Detection",
            journalName: "Journal of Electrical Engineering & Technology",
            doi: "https://doi.org/10.1007/s42835-024-02116-y",
            indexedIn: "SCI, SCOPUS",
            year: 2024,
          },
          {
            authorName: "Prakash, J., Murali, L., Manikandan, N., Nagaprasad, N. and Ramaswamy, K.",
            paperTitle:
              "A vehicular network based intelligent transport system for smart cities using machine learning algorithms",
            journalName: "Scientific Reports",
            doi: "https://doi.org/10.1038/s41598-023-50906-7",
            issn: "2045-2322",
            indexedIn: "SCI, SCOPUS",
            year: 2024,
          },
          {
            authorName: "Kalamani C., Kamatchi S., Sasikala S. & Murali L",
            paperTitle:
              "The design and implementation of folded adaptive lattice filter structures in FPGA for ECG signals",
            journalName: "Automatika",
            doi: "https://doi.org/10.1080/00051144.2023.2205725",
            issn: "0005-1144",
            indexedIn: "SCOPUS",
            year: 2023,
          },
          {
            authorName: "Murali.L, Ragul Ram Prashanth.A, Saravanan.B, Sathish Kumar.S and Vimalraj.K",
            paperTitle: "Design of an IoT based Electric Vehicle Charging Station",
            journalName: "Indian Journal of Natural Sciences",
            issn: "0976-0997",
            indexedIn: "Web of Science",
            year: 2023,
          },
          {
            authorName: "R P Meenaakshi Sundhari, L. Murali, S. Nagakumararaj and M. Navaneetha Krishnan",
            paperTitle:
              "Area Efficient Arithmetic Block using Reversible Logic for DSP Applications",
            journalName: "Indian Journal of Natural Sciences",
            issn: "0976-0997",
            indexedIn: "Web of Science",
            year: 2023,
          },
          {
            authorName: "N. Paramesh Kumar, S.Vijayabaskar, L. Murali & Krishnaraj Ramaswamy",
            paperTitle:
              "Design of optimal Elman Recurrent Neural Network based prediction approach for biofuel production",
            journalName: "Springer Scientific reports",
            doi: "https://doi.org/10.1038/s41598-023-34764-x",
            issn: "2045-2322",
            indexedIn: "SCI, SCOPUS",
            year: 2023,
          },
          {
            authorName: "L. Murali, W. Rajan Babu, P. Rathina Kumar, Anush Kannan N K",
            paperTitle:
              "Broadband graphene and metasurface-loaded solar thermal absorber design for visible and infrared regions",
            journalName: "Springer Opt Quant Electron",
            doi: "https://doi.org/10.1007/s11082-022-04331-1",
            indexedIn: "SCI, SCOPUS, UGC",
            impactFactor: 2.084,
            year: 2023,
          },
          // Additional journals from biodata
          {
            authorName: "Murali, L, Meenaakshi Sundhari, R.P., Jaikumar, K.",
            paperTitle:
              "Message Queuing Telemetry Transport (MQTT) Protocol-Based Monitoring and Segregation of Wastes in Smart Cities Using IOT",
            journalName: "Advances in Data and Information Sciences. Lecture Notes in Networks and Systems",
            doi: "https://doi.org/10.1007/978-981-19-5292-0_45",
            indexedIn: "SCOPUS",
            year: 2022,
          },
          {
            authorName: "Mugilan D, Kumar P, Tamilisai R, L.Murali",
            paperTitle:
              "Vegetation Analysis Using Landsat 8 Based Estimates: Case Study Of A Vaniyar Irrigation Area",
            journalName: "Journal Of Environmental Protection And Ecology",
            indexedIn: "SCOPUS",
            impactFactor: 0.56,
            year: 2023,
          },
          {
            authorName: "Nivethitha, A., Baskar, D., Murali, L., & Anandaselvakarthik, T.",
            paperTitle:
              "Deep clustering with convolution autoencoders and edge detection based classification and visualization of Alzheimer's disease",
            journalName: "International Journal of Health Sciences",
            doi: "https://doi.org/10.53730/ijhs.v6nS2.7751",
            indexedIn: "SCOPUS",
            impactFactor: 2.96,
            year: 2022,
          },
          {
            authorName: "S Sasikala, S Gomathi, V Geetha, L Murali",
            paperTitle:
              "A proposed framework for cloud-aware multimodal multimedia big data analysis toward optimal resource allocation",
            journalName: "The Computer Journal",
            doi: "10.1093/comjnl/bxaa192",
            issn: "0010-4620",
            indexedIn: "SCOPUS, SCI",
            impactFactor: 1.49,
            year: 2021,
          },
          {
            authorName: "B Saran Raj, Murali, L, Vijayaparamesh, B, J Sharan Kumar and Pragadeesh, P",
            paperTitle: "IoT Based Water Surface Cleaning and Quality Checking Boat",
            journalName: "Journal of Physics: Conference Series",
            indexedIn: "SCOPUS",
            impactFactor: 0.54,
            year: 2021,
          },
          {
            authorName: "R. P. Meenaakshi Sundhari and L. Murali",
            paperTitle:
              "A High-Performance Hybrid FIR Filter Design using Distributed Arithmetic and Lookup Table",
            journalName: "Dynamic Systems and Applications",
            issn: "1056-2176",
            indexedIn: "SCOPUS, UGC",
            impactFactor: 0.359,
            year: 2021,
          },
          {
            authorName: "N.Paramesh Kumar, S.Vijayabaskar, L.Murali",
            paperTitle: "Forecasting biofuel production using adaptive integrated optimization network model",
            journalName: "Journal of Fuels, Elsevier",
            doi: "10.1016/j.fuel.2020.118764",
            issn: "0016-2361",
            indexedIn: "SCI, SCOPUS, WoS",
            impactFactor: 6.60,
            year: 2020,
          },
          {
            authorName: "Meenakshi Sundhari R.P, Murali, L., Baskar, S., & Shakeel, P. M",
            paperTitle:
              "MDRP: Message dissemination with re-route planning method for emergency vehicle information exchange",
            journalName: "Journal of Peer-to-Peer Networking and Applications",
            doi: "10.1007/s12083-020-00936-z",
            issn: "1936-6442",
            indexedIn: "SCOPUS, UGC",
            impactFactor: 3.484,
            year: 2020,
          },
          {
            authorName: "Geetha, V, Anbumani, V, Sasikala, S, L.Murali",
            paperTitle: "Efficient hybrid multi-level matching with diverse set of features for image retrieval",
            journalName: "Journal of Soft Computing",
            doi: "10.1007/s00500-020-04671-8",
            issn: "1433-7479",
            indexedIn: "SCOPUS, UGC",
            impactFactor: 3.524,
            year: 2020,
          },
          {
            authorName: "G Swaminathan, G Murugesan, S Sasikala, L Murali",
            paperTitle:
              "A novel implementation of combined systolic and folded architectures for adaptive filters in FPGA",
            journalName: "Journal of Microprocessors and Microsystems, Elsevier",
            doi: "10.1016/j.micpro.2020.103018",
            issn: "0141-9331",
            indexedIn: "SCI, SCOPUS, UGC",
            impactFactor: 1.525,
            year: 2020,
          },
          {
            authorName: "K.Senthil kumar, T. Manigandan, D.Chitra and L.Murali",
            paperTitle: "Object recognition using Hausdorff distance for multimedia applications",
            journalName: "Journal of Multimedia Tools and Applications, Springer",
            doi: "10.1007/s11042-019-07774-z",
            issn: "1573-7721",
            indexedIn: "SCIE, SCOPUS, UGC",
            impactFactor: 2.39,
            year: 2019,
          },
          {
            authorName: "Murali, L, Chitra, D, Manigandan, T & Sharanya, B",
            paperTitle:
              "An Efficient Adaptive Filter Architecture for Improving the Seizure Detection in EEG Signal",
            journalName: "International Journal of Circuits Systems and Signal Processing, Springer",
            doi: "10.1007/s00034-015-0178-2",
            issn: "0278-081X",
            indexedIn: "SCOPUS, UGC",
            impactFactor: 1.118,
            year: 2015,
          },
        ],
      },

      conferences: {
        create: [
          {
            paperSno: "1",
            authorDetails:
              "K. S. Neelukumari, L. Murali, R. R., S. E. and N. N.",
            paperTitle:
              "A Predictive Machine Learning Analysis for Stroke Prediction",
            conferenceName:
              "3rd International Conference on Artificial Intelligence and Machine Learning Applications (AIMLA)",
            publisher: "IEEE",
            doiOrUrl: "10.1109/AIMLA63829.2025.11040619",
            year: 2025,
            indexedIn: "IEEE",
          },
          {
            paperSno: "2",
            authorDetails:
              "J. Vaishnavi, L. Murali, M. Yuvaraja, A. Parnika and A. Navaneetha",
            paperTitle:
              "Alzheimer's Disease Detection and Classification in Biomarkers Using Deep Learning",
            conferenceName: "AIMLA 2025",
            publisher: "IEEE",
            doiOrUrl: "10.1109/AIMLA63829.2025.11040661",
            year: 2025,
          },
          {
            paperSno: "3",
            authorDetails: "L. Murali, and M. Margala",
            paperTitle:
              "A Framework for Integrating Multimodal Data for Comprehensive Alzheimer's Disease Diagnosis",
            conferenceName: "AIMLA 2025",
            publisher: "IEEE",
            doiOrUrl: "10.1109/AIMLA63829.2025.11040686",
            year: 2025,
          },
          {
            paperSno: "4",
            authorDetails:
              "A. Sungheetha, K. S. Gowri, J. S, R. Ramanathan, R. S. R and L. Murali",
            paperTitle:
              "A Comparative Analysis of Hematological, Lipid Profile Parameters, and Body Mass Index in Male Vegetarians and Non-Vegetarians",
            conferenceName:
              "2nd International Conference on Signal Processing, Communication, Power and Embedded System (SCOPES)",
            publisher: "IEEE",
            doiOrUrl: "10.1109/SCOPES64467.2024.10990763",
            year: 2024,
          },
          {
            paperSno: "5",
            authorDetails:
              "Mariaraja. P, L. Murali, R. S. R, A. Sungheetha, G. P. Ghandasala and R. G. K",
            paperTitle:
              "Implementation of an Automatic Incinerator in Real Time for Safe Disposal of Sanitary Waste",
            conferenceName: "SCOPES 2024",
            publisher: "IEEE",
            doiOrUrl: "10.1109/SCOPES64467.2024.10990696",
            year: 2024,
          },
          {
            paperSno: "6",
            authorDetails:
              "R. V. Vardhan, B. Girinath, L. Murali, D. J. Ferdin and V. K. Aswathaman",
            paperTitle:
              "Automatic Sign Language Recognition Using Convolutional Neural Networks",
            conferenceName:
              "International Conference on Science Technology Engineering and Management (ICSTEM)",
            publisher: "IEEE",
            doiOrUrl: "10.1109/ICSTEM61137.2024.10560930",
            year: 2024,
          },
          {
            paperSno: "7",
            authorDetails:
              "G. Aravindh, R. Piraisudan, L. Murali, B. R. Silwin and T. Nithish",
            paperTitle:
              "A Visual Cryptographic Scheme for Colour QR Codes in Defence",
            conferenceName: "ICSTEM 2024",
            publisher: "IEEE",
            doiOrUrl: "10.1109/ICSTEM61137.2024.10560783",
            year: 2024,
          },
          {
            paperSno: "8",
            authorDetails: "Murali, L, Sharanya, B, &Manigandan, T",
            paperTitle:
              "Adaptive filtering of EEG and epilepsy detection using Recurrence Quantification Analysis",
            conferenceName:
              "IEEE International Conference on Advanced Communication Control and Computing Technologies (ICACCCT)",
            publisher: "IEEE",
            year: 2014,
          },
          {
            paperSno: "9",
            authorDetails: "Murali, L, Vishnu Gopeka, S, &Manigandan, T",
            paperTitle:
              "VLSI design of ECG QRS complex detection using Multiscale Mathematical Morphology",
            conferenceName: "IEEE ICACCCT",
            publisher: "IEEE",
            year: 2014,
          },
          {
            paperSno: "10",
            authorDetails: "Murali, L Sathyapriya, L, &Manigandan, T",
            paperTitle:
              "Analysis and detection R-peak detection using Modified Pan-Tompkins algorithm",
            conferenceName: "IEEE ICACCCT",
            publisher: "IEEE",
            year: 2014,
          },
          // National Conferences
          {
            paperSno: "11",
            authorDetails: "Murali, L",
            paperTitle:
              "Design and Development of Actuator Interface and Heater Switching(ASIC) For Space craft",
            conferenceName: "NCSCV'09",
            publisher: "National",
            year: 2009,
            indexedIn: "National",
          },
          {
            paperSno: "12",
            authorDetails: "Murali, L, & Deepak Vasudevan",
            paperTitle: "ASIC Based Design Of MIL-STD-1553 Protocol in spacecraft",
            conferenceName: "NACCO'10",
            publisher: "National",
            year: 2010,
            indexedIn: "National",
          },
          {
            paperSno: "13",
            authorDetails: "Murali, L, & krithika B",
            paperTitle:
              "Comparative Analysis of Karatsuma-ofman Multiplier & Montgomery Multiplier Based on their Performance and Evaluation in Elliptical Curve Cryptography",
            conferenceName: "NCCCN'11",
            publisher: "National",
            year: 2011,
            indexedIn: "National",
          },
          {
            paperSno: "14",
            authorDetails: "Murali, L, & Krithika B",
            paperTitle:
              "Comparative Analysis of Karatsuba-ofman Multiplier & Montgomery Multiplier",
            conferenceName: "NCCCD'11",
            publisher: "National",
            year: 2011,
            indexedIn: "National",
          },
          {
            paperSno: "15",
            authorDetails: "Murali, L, & Shari, R",
            paperTitle:
              "Design of Low Power & Area-Efficient Parallel FIR Design Filter Structures",
            conferenceName: "NCCCD'12",
            publisher: "National",
            year: 2012,
            indexedIn: "National",
          },
          {
            paperSno: "16",
            authorDetails: "Murali, L, & Shari, R",
            paperTitle:
              "Low Power And Area Efficient Parallel FIR Design Filter Structures",
            conferenceName: "NCCCN'12",
            publisher: "National",
            year: 2012,
            indexedIn: "National",
          },
          {
            paperSno: "17",
            authorDetails: "Murali, L, & Kavitha B Kumar",
            paperTitle:
              "Design and Implementation of Multiscale Mathematical Morphology for QRS Complex",
            conferenceName: "NCCCN'14",
            publisher: "National",
            year: 2014,
            indexedIn: "National",
          },
          {
            paperSno: "18",
            authorDetails: "Murali, L, & Teena Jain Tomy",
            paperTitle:
              "Design and Implementation of Low Power VLSI Architecture for ECG Detection",
            conferenceName: "NCCCN'14",
            publisher: "National",
            year: 2014,
            indexedIn: "National",
          },
          {
            paperSno: "19",
            authorDetails: "Murali, L",
            paperTitle:
              "Design and Implementation of Low power Carry select Adder using Positive feedback Adiabatic Logic in ALU",
            conferenceName:
              "National Conference on System Design and Information Processing",
            publisher: "National",
            year: 2018,
            indexedIn: "National",
          },
          {
            paperSno: "20",
            authorDetails: "Murali, L",
            paperTitle:
              "Design of memory array using modified 7T SRAM with low short circuit and standby power",
            conferenceName:
              "National Conference on System Design and Information Processing",
            publisher: "National",
            year: 2018,
            indexedIn: "National",
          },
        ],
      },

      books: {
        create: [
          {
            authorName: "L. Murali",
            title: "Handbook of IoT and Big Data",
            publisher: "Scientific International Publishing House",
            isbn: "978-93-5625-141-0",
            year: 2022,
          },
          {
            authorName: "L. Murali",
            title: "Enabling Artificial Intelligence and Cyber Security in Smart Manufacturing",
            bookTitle: "Artificial Intelligent Techniques for Wireless Communication and Networking",
            publisher: "Wiley",
            year: 2022,
          },
          {
            authorName: "L. Murali",
            title: "Optimized Machine Learning Based Pedestrian Detection For Autonomous Vehicle",
            bookTitle: "Smart Mobility and Intelligent Transportation Systems for Commercial and Hazardous Vehicles",
            publisher: "Apple Academic Press (Taylor and Francis)",
            isbn: "9781032684048",
            year: 2024,
          },
        ],
      },

      patents: {
        create: [
          {
            patentTitle: "A Device for Trimming and Grooming of Nails",
            patentNumber: "201641041003 A",
            authors: "Dr. L. Murali",
            status: PatentStatus.PUBLISHED,
            country: "India",
            year: 2016,
          },
          {
            patentTitle: "Smart Water Heater",
            patentNumber: "201641042313 A",
            authors: "Dr. L. Murali",
            status: PatentStatus.PUBLISHED,
            country: "India",
            year: 2016,
          },
          {
            patentTitle: "Smart Compact Structural Instrument",
            patentNumber: "201741036984 A",
            authors: "Dr. L. Murali",
            status: PatentStatus.PUBLISHED,
            country: "India",
            year: 2017,
          },
          {
            patentTitle: "S-800 Controller",
            patentNumber: "19/2020",
            authors: "Dr. L. Murali",
            status: PatentStatus.PUBLISHED,
            country: "India",
            year: 2020,
          },
          {
            patentTitle:
              "Machine Learning and Deep Learning based Medical Image Segmentation and Feature extraction Scheme for Practitioners using multidimensional clinical data",
            patentNumber: "202241005300",
            authors: "Dr. L. Murali",
            status: PatentStatus.PUBLISHED,
            country: "India",
            year: 2022,
          },
        ],
      },

      seminars: {
        create: [
          {
            eventName: "Recent Research in Biomimetic Devices: A Platform for Improving Neural Disorder",
            title: "National Level Seminar",
            fundingAgency: "ICMR",
            amount: 30000,
          },
          {
            eventName: "Security Issues and Challenges in Wireless Sensor Networks",
            title: "National Level Seminar",
            fundingAgency: "CSIR",
            amount: 20000,
          },
          {
            eventName: "Role of Satellites in 5G Networks",
            title: "National Level Seminar",
            fundingAgency: "CSIR",
            amount: 20000,
          },
          {
            eventName: "Medical Signal Processing in Biomedical and Clinical Applications",
            title: "National Level Seminar",
            fundingAgency: "CSIR",
            amount: 45000,
          },
          {
            eventName: "Content Based Visual Information Retrieval and Its Applications",
            title: "National Level Seminar",
            fundingAgency: "CSIR",
            amount: 30000,
          },
          {
            eventName: "Nanotechnology for Health: Innovative Designs for Medical Diagnosis",
            title: "National Level Seminar",
            fundingAgency: "TNSCST",
            amount: 20000,
          },
        ],
      },

      awards: {
        create: [
          {
            awardName: "Young Researcher Award",
            awardingBody: "SIAA, ASDF",
            year: 2017,
            details: "Recognition for outstanding research contributions",
          },
          {
            awardName: "Best Reviewer Award",
            awardingBody: "Wiley Journal",
            year: 2020,
            details: "Awarded for exceptional peer review contributions",
          },
        ],
      },

      invitedTasks: {
        create: [
          {
            facultyName: "Dr. L. Murali",
            title: "Invited keynote Speaker",
            invitedAt: "National Conference on Computer Communication Control, Hindusthan College of Engineering and Technology",
            date: new Date("2014-03-15"),
          },
          {
            facultyName: "Dr. L. Murali",
            title: "Invited Keynote Speaker",
            invitedAt: "CSIR Sponsored Workshop on Recent Advances in Microwave Engineering, Hindusthan College of Engineering and Technology",
            date: new Date("2013-06-15"),
          },
          {
            facultyName: "Dr. L. Murali",
            title: "Invited Speaker",
            invitedAt: "National Workshop on Research Issues in Distributed Computing for Medical Image Processing, P.A.College of Engineering and Technology",
            date: new Date("2012-02-15"),
          },
          {
            facultyName: "Dr. L. Murali",
            title: "Invited Plenary Speaker",
            invitedAt: "National Workshop on Modelling & Building Blocks for Future Nanoelectronics, Hindusthan College of Engineering and Technology",
            date: new Date("2014-08-15"),
          },
        ],
      },

      phdGuided: {
        create: [
          {
            candidateName: "Research Scholar 1",
            researchYear: 2020,
            university: "Anna University",
            status: "Ongoing",
          },
          {
            candidateName: "Research Scholar 2",
            researchYear: 2021,
            university: "Anna University",
            status: "Ongoing",
          },
          {
            candidateName: "Research Scholar 3",
            researchYear: 2022,
            university: "Anna University",
            status: "Ongoing",
          },
          {
            candidateName: "Research Scholar 4",
            researchYear: 2023,
            university: "Anna University",
            status: "Ongoing",
          },
          {
            candidateName: "Research Scholar 5",
            researchYear: 2024,
            university: "Anna University",
            status: "Ongoing",
          },
        ],
      },

      nptelCourses: {
        create: [
          {
            courseName: "Digital Signal Processing",
            instructorName: "Prof. S.C. Dutta Roy",
            platformLink: "https://nptel.ac.in/courses/108/103/108103057/",
            completionYear: 2018,
            duration: "12 weeks",
          },
          {
            courseName: "VLSI Design",
            instructorName: "Prof. S. Srinivasan",
            platformLink: "https://nptel.ac.in/courses/117/106/117106092/",
            completionYear: 2019,
            duration: "12 weeks",
          },
          {
            courseName: "Digital Image Processing",
            instructorName: "Prof. P.K. Biswas",
            platformLink: "https://nptel.ac.in/courses/117/105/117105079/",
            completionYear: 2020,
            duration: "8 weeks",
          },
          {
            courseName: "Machine Learning for Engineering and Science Applications",
            instructorName: "Prof. Balaji Srinivasan",
            platformLink: "https://nptel.ac.in/courses/106/106/106106197/",
            completionYear: 2021,
            duration: "12 weeks",
          },
          {
            courseName: "Introduction to Internet of Things",
            instructorName: "Prof. Sudip Misra",
            platformLink: "https://nptel.ac.in/courses/106/105/106105166/",
            completionYear: 2022,
            duration: "8 weeks",
          },
          {
            courseName: "Deep Learning for Computer Vision",
            instructorName: "Prof. Vineeth N Balasubramanian",
            platformLink: "https://nptel.ac.in/courses/106/106/106106184/",
            completionYear: 2023,
            duration: "12 weeks",
          },
        ],
      },

      mous: {
        create: [
          {
            companyName: "Texas Instruments India",
            purpose: "Collaborative Research in Embedded Systems and VLSI Design",
            duration: "3 years",
          },
          {
            companyName: "Bosch India",
            purpose: "Industry-Academia Collaboration for IoT and Automotive Electronics",
            duration: "5 years",
          },
          {
            companyName: "Siemens Technology India",
            purpose: "Research and Development in Industrial Automation and Control Systems",
            duration: "3 years",
          },
          {
            companyName: "Infosys Limited",
            purpose: "Faculty Development and Student Training in Emerging Technologies",
            duration: "2 years",
          },
          {
            companyName: "L&T Technology Services",
            purpose: "Collaborative Projects in Signal Processing and Communication Systems",
            duration: "4 years",
          },
        ],
      },
    },
  });

  console.log("✅ Faculty and related data seeded successfully:", faculty.name);
  console.log("📊 Summary:");
  console.log("  - Journals: Complete with all 23 publications");
  console.log("  - Conferences: 20 papers (10 International + 10 National)");
  console.log("  - Books: 3 publications");
  console.log("  - Patents: 5 published patents");
  console.log("  - Seminars: 6 organized events");
  console.log("  - Awards: 2 recognitions");
  console.log("  - Invited Talks: 4 events");
  console.log("  - PhD Guided: 5 scholars (Ongoing)");
  console.log("  - NPTEL Courses: 6 completed courses");
  console.log("  - MoUs: 5 industry collaborations");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
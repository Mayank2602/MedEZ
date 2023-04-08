# MedEZ
### Problem Statement
In today's world, people face the issue of having to compare prices of medicines in their prescriptions across various online platforms, which can be a hectic task especially when dealing with multiple medications. This problem becomes even more significant when expensive medications need to be purchased, as it could result in potential savings of up to 80% in some cases. From identifying the names of the medications in a prescription to actually purchasing them from an online pharmacy and keeping track of their dosage, the process can be overwhelming for a patient, and there is a need to simplify it.

### Solution
- Our solution aims to simplify the process of purchasing and managing medications for patients by integrating various technologies. We will use **Optical Character Recognition (OCR)** to extract medication details from prescriptions using **Google Cloud Vision**. We will then employ the Med7 **machine learning model** from **spaCy** to extract the medication names, dosages, and frequencies.

- To ensure efficient retrieval and management of data, we will cache the extracted medication details and prices in a database. The backend, written in Python, will handle data processing, price comparisons, and medication scheduling using multi-threading to optimize performance. We will use **web scraping techniques** to fetch medication prices from various online pharmacies.

- For the frontend, we will develop a **React-based user interface** that will showcase medication details, including names, dosages, durations, and prices from various websites. Additionally, the frontend will feature a calendar where patients can schedule medication reminders and track their dosages. The calendar will be integrated with **Google Calendar**, allowing patients to receive reminders across devices and platforms.

- Our solution aims to simplify the medication purchasing process for patients, provide them with valuable cost-saving opportunities, and ensure that they can easily track and manage their medication schedules.

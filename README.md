# MedXpress MERN APP

Introduction

MedXpress is a customer service app that efficiently facilitates the acquisition of prescribed medicines, tailored especially to the elderly, PWDs, and other patients who value their time and need a hassle-free option to get their medicines.

With the MedXpress app, physicians can conveniently access patient data and send digital prescriptions to the pharmacy. The pharmacy then prepares the medication and promptly notifies patients to collect their medicines, eliminating the need for patients to spend time and effort traveling to and from the doctor's clinic and pharmacy.

# API Reference

|  #  | Action |                    URL                    | HTTP Verb |  CRUD  |                              Description                              |
| :-: | :----: | :---------------------------------------: | :-------: | :----: | :-------------------------------------------------------------------: |
|  1  | Create |      /patientData/uploadPatientData       |   POST    | Create |                         Uploads patient data                          |
|  2  |  Read  |               /patientData                |   POST    |  Read  |                         Gets all patient data                         |
|  3  | Create |            /userData/register             |   POST    |  Read  |                           Creates new user                            |
|  4  |  Read  |                 /userData                 |    GET    |  Read  |                          Gets all user data                           |
|  5  | Create | /prescriptionData/uploadPrescriptionData  |   POST    |  Read  |                       Uploads prescription data                       |
|  6  |  Read  |             /prescriptionData             |    GET    |  Read  |                      Gets all prescription data                       |
|  7  | Update |    /prescriptionData/updateStatus/:id     |   PATCH   | Update | Updates the status of prescriptions from pending, ready, to completed |
|  8  | Update | /prescriptionData/archivePrescription/:id |   PATCH   | Update |          Stores the completed prescriptions to the database           |

# User Stories

    1. User Persona
        a. Physician - Physician who accepts patients and issues medical prescriptions. He/She is connected to the Pharmacy that supplies the medications. He/She sends the prescriptions and patient details to the pharmacy, and the pharmacy dispenses the medications to the patient/s.

        b. Pharmacy - Any employee of the pharmacy who receives the prescription from the physician. He/She prepares the medicines and notifies the patient whenever it is ready for pickup through the indicated contact number.

    2. User Journey

        a. Physician
            1. Logs in to the App to access the Order form to the Pharmacy
            2. Searches and inputs the patient details
            3. Uploads the prescription
            4. Sends the request to the pharmacy

        b. Pharmacy
            1. Logs in to access the list of orders from different physicians
            2. Gets the patient details and views the prescription
            3. By default order status is on preparing, statuses can be changed by pharmacist to ready, complete or archive.
            4. The preparing and ready statuses are reflected on the order tracker.

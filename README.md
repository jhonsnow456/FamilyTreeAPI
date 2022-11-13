# FamilyTreeAPI

### WorkFlow:
- The data is prepared from the electoral roll call of the Constetuency present in the region by visiting the [Government's one stop Electoral Roll Website](https://eci.gov.in/electoral-roll/link-to-pdf-e-roll/) from where we have downloaded the pdf by enterning captcha which was a manual process. 
- The generated pdf then was converted to image such that it could be feed to OCR.
- The data extracted from OCR was futher processes and cleaned.
- Then the data is converted to json objected
- The data was further moved into MongoDB database
- The API was then being generated using NodeJs, ExpressJs and hosted over AWS instance
- The testing of API endpoints was done using postman.

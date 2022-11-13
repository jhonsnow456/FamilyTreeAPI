# FamilyTreeAPI

### WorkFlow:
- The data is prepared from the electoral roll call of the Constetuency present in the region by visiting the [Government's one stop Electoral Roll Website](https://eci.gov.in/electoral-roll/link-to-pdf-e-roll/) from where we have downloaded the pdf by enterning captcha which was a manual process. 
- The generated pdf then was converted to image such that it could be feed to OCR.
- The data extracted from OCR was futher processes and cleaned.
- Then the data is converted to json objected
- The data was further moved into MongoDB database
- The API was then being generated using NodeJs, ExpressJs and hosted over AWS instance
- The testing of API endpoints was done using postman.

### Data Collection from pdf

- Install the cli-tool [ocrmypdf](https://github.com/ocrmypdf/OCRmyPDF) to process pdf using the below command
  Since we are using linux system run 
  ```
  sudo apt install ocrmypdf
  ```
- Install pikepdf using command line tool ```pip3 install pikepdf``` and write the below code to decrypt the file
  ```
  import pikepdf
  pdf = pikepdf.open('data2.pdf') # write your own protected pdf file name
  pdf.save('data_2.pdf') # decrypted file
  ```
  Note: This happens because of mordern day scanners.
- Run the following command in the terminal to get the output ocr pdf file.
  ```
  ocrmypdf -l eng --deskew --title 'data_.pdf' --job 2 --output-type pdfa data_2.pdf output.pdf
  ```
- Now just extract the voter details clean it and convert the data into json format and put the details into the database mentioned above.

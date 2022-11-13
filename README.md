# FamilyTreeAPI

![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white) &nbsp; ![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) &nbsp; ![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) &nbsp; ![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)

## WorkFlow:
- The data is prepared from the electoral roll call of the Constetuency present in the region by visiting the [Government's one stop Electoral Roll Website](https://eci.gov.in/electoral-roll/link-to-pdf-e-roll/) from where we have downloaded the pdf by enterning captcha which was a manual process. 
- The generated pdf then was converted to OCR enabled pdf.
- The data extracted from OCR was futher processes and cleaned.
- Then the data is converted to json object.
- The data was further moved into MongoDB database
- The API was then being generated using NodeJs, ExpressJs and hosted over AWS instance
- The testing of API endpoints was done using postman.

### About APIs
- We first fetch places from places collection in database and get place id.
- Using place id we fetch electoral roll data of particular place.
- Search the person with the voter id and find the relation with other person based on house no in that particular place.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/11764194-11437813-0399-4438-9357-f5be2aeb610f?action=collection%2Ffork&collection-url=entityId%3D11764194-11437813-0399-4438-9357-f5be2aeb610f%26entityType%3Dcollection%26workspaceId%3D88299b6e-93e5-4dd9-bcbf-2f00ed3e919e)

### Additional Feature:
- Generating the pdf of the person and his relations with his family members as mentioned in the problem statement.

## Project Configuration and setup:

### Server setup:

- Create a .env file and add these two configuration
  ```
  PORT = <YOUR PORT NUMBER>
  MONGO_URL = <YOUR MONGODB URI>
  ```
- Use NodeJS version 16LTS or higher
- Use package manager such yarn or npm as per your choice:
  
  For ```npm```
  ```
  npm i
  ```
  For ```yarn```:
  ```
  yarn install
  ```
  
### Python setup:
- change directory to ```pdf_processing```
```
cd pdf_processing
```
- Use python version 3.7 or 3.8
- Run the command mentioned below:
```
$ python3.8 -m venv env
$ source env/bin/activate
$ pip3 install requirements.txt
```
- Follow the steps mentioned in the next section ```Data Collection from pdf``` for further processing.

## Data Collection from pdf

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
  <strong>Note:</strong> This happens because of mordern day scanners.
- Run the following command in the terminal to get the output ocr pdf file.
  ```
  ocrmypdf -l eng --deskew --title 'data_.pdf' --job 2 --output-type pdfa data_2.pdf output.pdf
  ```
- Now just extract the voter details clean it and convert the data into json format and put the details into the database mentioned above.

## Future Scope
- The electoral roll data which we are now using is based on english, however the same procedure can be done to extract other languages.
- The other language is then being translated to the english using [python library ```translate```](https://medium.com/@pythonprogrammers/language-translator-in-python-b3362e1ae9c0).
- Thus expanding to length and breadth of our country and  incrreasing the size of organised data of voters and their relations.

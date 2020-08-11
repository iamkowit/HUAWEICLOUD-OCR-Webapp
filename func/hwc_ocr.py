from HWOcrClientAKSK import HWOcrClientAKSK
import sys
import os

reload(sys)
sys.setdefaultencoding('utf8')


currentDir = os.environ["RUNTIME_CODE_ROOT"]
imgDict = {'idCard' : currentDir+'/img/id-card-demo.jpg'}

def handler(event, context):
    region = context.getUserData('region', 'ap-southeast-2').strip()
    ak = context.getAccessKey().strip()
    sk = context.getSecretKey().strip()

    if not region:
        raise Exception("'region' not configured")

    if not ak or not sk:
        ak = context.getUserData('ak', 'AQJ7KZJR00DDWVOSEWIP').strip()
        sk = context.getUserData('sk', 'vWWjq6rLRw9qpQ5GyoUsbQ0lWZWU3Q3OgYSkukdl').strip()
        if not ak or not sk:
            raise Exception("ak/sk empty")

    imagePath = ""  # File path or URL of the image to be recognized.
    option = {}

    ocr_client = HWOcrClientAKSK(ak, sk, region)  # Initialize the ocr_client.
    recognizeIdCard(ocr_client, imagePath, option)


def recognizeIdCard(ocrClient, imgPath, option):
    try:
        reqUri = "/v1.0/thailand-id-card"
        if len(imgPath) == 0:
            imgPath = imgDict['idCard']
        response = ocrClient.request_ocr_service_base64(reqUri, imgPath, option)  # Call the OCR API to recognize image.
        print("Status code:" + str(response.status_code) + "\ncontent:" + response.text)
    except ValueError as e:
        print(e)

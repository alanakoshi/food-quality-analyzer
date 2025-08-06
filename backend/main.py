from fastapi import FastAPI, File, UploadFile
from predict import predict_image_multioutput
import tempfile

app = FastAPI()

@app.get("/")
def root():
    return {"message": "API is working"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()

    # save to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_image:
        temp_image.write(image_bytes)
        temp_image_path = temp_image.name

    prediction = predict_image_multioutput(temp_image_path, show_plt=True)
    return {"prediction": prediction}
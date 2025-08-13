from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from predict import predict_image_multioutput
import tempfile

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://food-quality-analyzer.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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

    prediction = predict_image_multioutput(temp_image_path)
    return JSONResponse(content={"result": prediction})
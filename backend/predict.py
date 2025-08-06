from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array, smart_resize
import numpy as np
import matplotlib.pyplot as plt

model = load_model('multioutput_food_model.keras')

index_to_item = {
    0: 'apple',
    1: 'banana',
    2: 'cucumber',
    3: 'okra',
    4: 'orange',
    5: 'potato',
    6: 'tomato'
}

def predict_image_multioutput(img_path, show_plt=False):
    img = load_img(img_path)
    img_array = img_to_array(img)

    img_array_resized = smart_resize(img_array, (150, 150)) / 255.0
    img_array_expanded = np.expand_dims(img_array_resized, axis=0)

    item_pred, fresh_pred = model.predict(img_array_expanded)
    item_idx = np.argmax(item_pred)
    fresh_val = "fresh" if fresh_pred[0][0] > 0.5 else "rotten"

    result = {
        "item": index_to_item[item_idx],
        "item_confidence": float(item_pred[0][item_idx]),
        "freshness": fresh_val,
        "freshness_confidence": float(fresh_pred[0][0])
    }

    if show_plt:
        plt.imshow(img_array_resized.astype("float32"))
        plt.title(f"{fresh_val} {index_to_item[item_idx]}")
        plt.axis('off')
        plt.show()

    return result
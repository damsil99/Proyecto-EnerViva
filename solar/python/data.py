import pandas as pd
import numpy as np
import csv
import json

# Se crea el archivo donde se va a almacenar los datos. En JSON

docConsumos = pd.read_csv("data/2-consumoEnergia.csv")
docConsumos = docConsumos.replace({np.nan: None})

consumo = docConsumos.to_dict(orient="records")

with open("data/consumo.json", "w", encoding="utf-8") as archivo1:
    json.dump(consumo, archivo1, indent=4)


# Se crea el json de producción

docProduccion = pd.read_csv("data/3-ProduccionEnergia.csv")
docProduccion = docProduccion.replace({np.nan: None})

produccion = docProduccion.to_dict(orient="records")

with open("data/produccion.json", "w", encoding="utf-8") as archivo2:
    json.dump(produccion, archivo2, indent=4)
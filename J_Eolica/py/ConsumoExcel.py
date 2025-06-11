import pandas as pd
import matplotlib.pyplot as plt

# Crea un dataframe que lee el archivo csv de consumo de energia desde la ruta relativa
df = pd.read_csv("J_Eolica\py\ConsumoEnergia.csv")
# Crea un dataframe que lee el archivo csv de produccion de  de energia desde la ruta relativa
dfPcc = pd.read_csv("J_Eolica\py\ProduccionEnergia.csv")
print(df)
print(dfPcc)


# Genero un filtro que muestre desde el 2000 porque antes no se evidencia produccion de esa energia (pcc-csmo)
dfColombiaCsmo = df[(df["pais"]=='Colombia') & (df['year']>2000)]
dfColombiaPcc = dfPcc[(dfPcc["pais"]=='Colombia') & (dfPcc['year']>2000)]

# tamaño de la figura
plt.figure(figsize=(12, 7))
# impresion de las lineas en la misma grafica
# label genera las etiquetas de cada linea
plt.plot(dfColombiaCsmo['year'],dfColombiaCsmo['eolica'], label="Consumo", marker='s', color='blue')
plt.plot(dfColombiaPcc['year'],dfColombiaPcc['eolica'], label="Produccion",marker='s', color='green')

# Titulo de la grafica
plt.title("Consumo vs Produccion de Energía Eolica en Colombia", fontsize=18)
# Etiqueta de las X
plt.xlabel("Año")
# Etiqueta Y
plt.ylabel("Consumo de Energía (TWh)")

# activa la cuadrícula del gráfico.
plt.grid(True)
# Ajuste de margenes
plt.tight_layout()
plt.legend()


plt.savefig("J_Eolica/py/vsConsumoProduccion.png")
plt.show()
plt.close()
print("Gráfico guardado correctamente.")


ultimoAnio= dfColombiaCsmo['year'].max()
datosUltimoAnio=dfColombiaCsmo[dfColombiaCsmo['year']==ultimoAnio]

energias= ['solar', 'eolica', 'biomasa', 'hidraulica']
valores= [
            float(datosUltimoAnio['solar']),
            float(datosUltimoAnio['eolica']),
            float(datosUltimoAnio['biomasa']),
            float(datosUltimoAnio['hidro'])
        ]
plt.figure(figsize=(12,7))

# 4. Crear la gráfica de pastel
colores = ["#4F4718", "#87CEEB", "#4E5CED", "#F8B687"]  # Amarillo solar, azul eólica, verde hidráulica, marrón biomasa
plt.pie(valores, labels=energias, autopct='%1.1f%%', startangle=140, colors=colores, explode=[0.2,0.2,0.5,0.2])

plt.title(f"Participacion de las energias Renovables en Colombia - {ultimoAnio}", fontsize=18)
plt.axis('equal')  # Asegura que la torta sea circular

# # 5. Mostrar
plt.legend()
plt.savefig("J_Eolica/py/torta")
plt.show()


# aca vamos a mostrar la grafica de barras de la produccion de las energias.
totales = {
    "Solar": dfColombiaPcc["solar"].sum(),
    "Eólica": dfColombiaPcc["eolica"].sum(),
    "Hidráulica": dfColombiaPcc["hidro"].sum(),
    "Biomasa": dfColombiaPcc["biomasa"].sum()
}

# 4. Crear gráfico de barras
plt.figure(figsize=(12, 7))
barras = plt.bar(totales.keys(), totales.values(), color=["orange", "green", "blue", "brown"])

# 🔽 Añadir etiquetas encima de cada barra
for barra in barras:
    altura = barra.get_height()
    plt.text(barra.get_x() + barra.get_width()/2, altura + 1, f'{altura:.2f}', 
             ha='center', va='bottom', fontsize=10)


# 5. Etiquetas y diseño
plt.title("Producción total por fuente de energía en Colombia", fontsize=18)
plt.xlabel("Fuente de energía", fontsize=12)
plt.ylabel("Producción total (TWh)", fontsize=12)
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()

# Guardar grafico de Barras
plt.savefig("J_Eolica/py/barras")

# 6. Mostrar gráfico
plt.show()


# haremos un grafico de area para revisar las comparaciones
# Leer el archivo de consumo
df = pd.read_csv("J_Eolica\py\ConsumoEnergia.csv")

# Filtrar Colombia y años desde 1980
dfCol = df[(df['pais'] == 'Colombia') & (df['year'] >= 1980)]

# Gráfico de área
plt.figure(figsize=(12, 7))

plt.stackplot(dfCol['year'],
              dfCol['eolica'],
              dfCol['solar'],
              dfCol['biomasa'],
              dfCol['hidro'],
              labels=['Eólica', 'solar','biomasa', 'Hidraulica'],
              colors=['skyblue', 'lightgreen','red','yellow'],
              alpha=0.7)

plt.title("Consumo de Energía Eólica e solar en Colombia (1980+)",fontsize=18)
plt.xlabel("Año")
plt.ylabel("Consumo de Energía (TWh)")
plt.legend(loc='upper left')
plt.grid(True)
plt.tight_layout()
plt.savefig("J_Eolica/py/AreaTodos")
plt.show()

plt.figure(figsize=(12, 7))

plt.stackplot(dfCol['year'],
              dfCol['eolica'],
              dfCol['solar'],
              labels=['Eolica', 'Solar'],
              colors=['skyblue', 'yellow'],
              alpha=0.7)

plt.title("Consumo de Energía Solar vs Eolica en Colombia (1980+)",fontsize=18)
plt.xlabel("Año")
plt.ylabel("Consumo de Energía (TWh)")
plt.legend(loc='upper left')
plt.grid(True)
plt.tight_layout()
plt.savefig("J_Eolica/py/AreaSolarEolica")
plt.show()


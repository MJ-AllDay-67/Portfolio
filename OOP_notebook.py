import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

class DataImport:
    
    def __init__(self):
        self.self = self
        
    def importcsv(self, data_file):
        df_out = pd.read_csv(f'C:/Users/15514/OneDrive/Desktop/MichaelTiernan/Projects/Data/{data_file}.csv')
        
        return df_out

########### Import Data ###########
object_1 = DataImport()
df_teams = object_1.importcsv("Teams")
df_gamelogs = object_1.importcsv("gamelogs")
df_stats = object_1.importcsv("stats")

print("hello")
# print(df_teams.head())
# print(df_gamelogs.head())
# print(df_stats.head())

# # drop cols
# cols = ['teamID','lgID','divID','Rank','G','Ghome','L','CS','HBP','IPouts','name','park','attendance','teamIDBR','teamIDlahman45','teamIDretro']
# df_teams.drop(cols, axis=1, inplace=True)
# df_teams.tail()










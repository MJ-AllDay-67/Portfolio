import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

class DataImport:
    
    def __init__(self):
        self.self = self
        
    def importcsv(self, data_file):
        df_out = pd.read_csv(f'C:/Users/15514/OneDrive/Desktop/MichaelTiernan/Portfolio/Data/{data_file}.csv')
        
        return df_out

########### Import Data ###########
object_1 = DataImport()
df_batting = object_1.importcsv("Batting")
df_fielding = object_1.importcsv("Fielding")
df_people = object_1.importcsv("People")
df_player_stats = object_1.importcsv("stats")
df_hof = object_1.importcsv("HallOfFame")


########### drop cols ###########
# batting
cols = ['stint','CS','IBB','HBP','SH','SF']
df_batting.drop(cols, axis=1, inplace=True)
print(df_batting.tail())

#Fielding
df_fielding = df_fielding[['playerID','yearID','teamID','POS']]
print(df_fielding.tail())

# people
cols = ['birthYear', 'birthMonth', 'birthDay','birthCity','deathYear','deathMonth','deathDay','deathCountry','deathState','deathCity','nameGiven','debut',\
    'finalGame','retroID','bbrefID']
df_people.drop(cols, axis=1, inplace=True)
print(df_people.tail())

# player stats
cols = ['isolated_power','b_lob','Unnamed: 14']
df_player_stats.drop(cols, axis=1, inplace=True)
print(df_player_stats.tail())

# HOF
print(df_hof.columns)
cols = ['votedBy','ballots','needed','votes','needed_note']
df_hof.drop(cols, axis=1, inplace=True)
print(df_hof.tail())






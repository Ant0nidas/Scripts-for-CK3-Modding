# Scripts-for-CK3-Modding
Collection of my personal scripts to automate stupid tasks. All scripts are written by ChatGPT.

To run JavaScripts you need to use a JavaScript runtime like NodeJS. Open your command prompt (Win+R, type "cmd") and navigate to the folder where the script is located with "cd /d YOURPATHHERE" and run the command "node scriptName.js".

## Instructions for specific files  
### icondds_to_texticongui.js  
Script reads every .dds file in a specified directory and includes them with correct syntax in new file texticon.gui. This results in correct display of MaA icons and illustrations ingame (provided you have related illustrations with identical name in gfx folders men_at_arms_big and _small) while saving you a stupid manual task.
1.  Open with text editor
2.  @line4, replace YOUR FULL PATH HERE with (you guessed it) the path of your icon.dds files. For example:
    const folderPath = path.resolve("G:/Steam/steamapps/workshop/content/1158310/2615435354/gfx/interface/icons/regimenttypes");
4.  Run the script, output file "texticon.gui" will be created in the path you specified in step 2)
5.  Place newly created file "texticon.gui" in folder /gui and enjoy!

### ibtp_patcher.js (Ibn Battuta's Terrain Pack)
Place in CK3 mod directory (\Steam\steamapps\workshop\content\1158310). Make sure you only have the mods in there that you want patched.
This script will read each .txt and for every instance of "hills"; "taiga"; "drylands" it will create a new line with new IBL terrain that has the same parameter values. Created folder "output" that mimics and smartly merges original directory.

### CMH_error_suppression.js
All credit goes to Tobbzn for file structure and Paradox Script!
Place in \Documents\Paradox Interactive\Crusader Kings III\logs
This script will read the error.log and will then create files which fix all of those errors:
`Flag is set but is never used; Variable is set but is never used; Variable is used but is never set; Event target is used but is never set; Modifier was not used by the script or code`

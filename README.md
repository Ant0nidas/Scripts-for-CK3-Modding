# Scripts-for-CK3-Modding
Collection of my personal scripts to automate stupid tasks.

To run JavaScripts you need to use a JavaScript runtime like NodeJS. Open your command prompt or terminal and navigate to the folder where the script is located with "cd YOURPATHHERE" and run the command "node scriptName.js".

## Instructions for specific files  
### icondds_to_texticongui.js  
Script reads every .dds file in a specified directory and includes them with correct syntax in new file texticon.gui. This results in correct display of MaA icons and illustrations ingame (provided you have related illustrations with identical name in gfx folders men_at_arms_big and _small) while saving you a stupid manual task.
1.  Open with text editor
2.  @line4, replace YOUR FULL PATH HERE with (you guessed it) the path of your icon.dds files
3.  Run the script, output file "texticon.gui" will be created in the path you specified in step 2)
4.  Place newly created file "texticon.gui" in folder /gui and enjoy!

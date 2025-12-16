# Portable Accessories for CorpusSearch2 _Lite_ (PACS_lite)
## A browser-based graphical interface for running CorpusSearch 2 queries on Penn-style parsed corpora. 
<img width="144" height="108" alt="a dove with the letters PACS" src="https://github.com/user-attachments/assets/f9516edd-adbe-4406-90f2-f967bb52fdf0" />

### PACS_lite [pæks lajt] adds the following features to CorpusSearch 2 (but unlike PACS is not dependent on a particular MAC architecture):

- queries results are displayed in a web browser
- nodes in results trees can be color coded 
- before the SUMMARY, every hit is repeated, showing only the queried nodes
- texts in the SUMMARY with hits are highlighted yellow 
- a window in PACS can strip lemmata from results sentences 

###	Prerequisites
a.	CorpusSearch2 (CS2) https://corpussearch.sourceforge.net/CS.html

 -	CS2 requires Java.

### Getting Started
a.	Copying the Files

 -	Download the PACS_lite folder onto your local machine.

 -	Copy the files of the corpus you wish to search into a folder called "corpus" inside the PACS folder.

b.	Specify the directory in PACS_lite.app

 -	Open Automator and click Open an Existing Document…

 -	Select PACS_lite.app

 - Change the directory (highlighted in this image) to your directory:
   
<img width="339" height="130" alt="image" src="https://github.com/user-attachments/assets/9a4c4654-b7b7-475f-b3e1-f72c52e0fe5d" />

 -	Save and close Automator.

 -	Note that if you move the PACS_lite folder, you will need to repeat these steps.

c.	Specify the file extensions to search

 -	Open the files folder and open the file search in TextEdit. Locate this line and change .txt (highlighted in this image) at the end to match the file types of your corpus (likely either .txt or .psd):
   
<img width="340" height="19" alt="image" src="https://github.com/user-attachments/assets/f0f11c18-d233-447e-b7d4-6b46919dce5d" />

 
 -	Save and close search

###	Running PACS_lite
a.	Double-click PACS_lite.app. This opens query.txt in TextEdit and runs a script in Terminal.

 - 	Enter your query into query.txt.

    1.	To color-code your results, add e.g. {1}. Note that curly brackets precede square brackets, hence the reminder in the default text.
   
    2.	For example, this query will show all dative direct objects:
   
      `query: ({1}NP-OB1 idoms {2}ADJ^D*)`

    3.	To color-code a leaf, add e.g. 3leaf at the end of the query:
   
      `query: ({1}NP-OB1 idoms {2}ADJ^D*)`

      `AND (ADJ^D* idoms {3}.*)`

      `3leaf`

 -	Save query.txt.

 -	Click in the Terminal window and press enter.


b.	This opens PACS_lite.html in Google Chrome.

 - 	The large frame shows the output. At the bottom, the hits are listed and the texts containing hits are highlighted.

 - 	The top-right frame contains the query for reference.

 - 	To create an unlemmatized copy of a result, first copy the prose sentence into the middle-right box, then click the “Show” button. In the small box beside the button, you can change how lemmata are indicated. (Icepac lemmatizes with “-”; Ipchg lemmatizes with “=”.) The unlemmatized copy displays in the bottom-right frame.

c.	To run another query, double-click PACS_lite.app again and repeat the process. (If you've left your previous query.txt open, you can edit that, and hit "save anyway" before pressing enter in Terminal.)



node: A-NP
ignore_nodes:  META|,
coding_query:

1: {
head:	(A-NP idoms N^*) AND (N^* hassister ADJ^*) AND (N^* precedes ADJ^*)
phrase:	(A-NP idoms N^*) AND (N^* hassister ADJP*) AND (N^* precedes ADJP*)
irrel:	ELSE
   }
 
2: {
gap:	(A-NP idoms N^*) AND (N^* hassister ADJ^*|ADJP*) AND (N^* precedes ADJ^*|ADJP*) AND (N^* iprecedes !ADJ*)	
nogap:	(A-NP idoms N^*) AND (N^* hassister ADJ^*|ADJP*) AND (N^* iprecedes ADJ^*|ADJP*)	
   }
 
3: {
nom:	(A-NP idoms N^*) AND (N^* haslabel *^N^*)
acc:	(A-NP idoms N^*) AND (N^* haslabel *^A^*)
dat:	(A-NP idoms N^*) AND (N^* haslabel *^D^*)
gen:	(A-NP idoms N^*) AND (N^* haslabel *^G^*)
   }
 
4: {
sg:	(A-NP idoms N^*) AND (N^* haslabel *^SG)
pl:	(A-NP idoms N^*) AND (N^* haslabel *^PL)
   }

<!-----

You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 6

Conversion time: 2.084 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β35
* Wed Dec 13 2023 10:24:09 GMT-0800 (PST)
* Source doc: BENG183 Final Report/Script
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 0; ALERTS: 6.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>
<a href="#gdcalert5">alert5</a>
<a href="#gdcalert6">alert6</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>



## **_What is RNA Sequencing?_**


### **RNA-Sequencing Basics**

	RNA sequencing (RNA-seq) is a cutting-edge next-generation sequencing technology extensively utilized for the comprehensive analysis of RNA in biological samples. RNA-seq was founded in the mid-2000s when technological advancements in next-generation sequencing (NGS) platforms, such as Illumina, allowed it to be performed and shared by a multitude of institutions worldwide. This novel method not only let researchers obtain a quantitative measure of gene expression but also enabled the identification of novel transcripts, alternative splicing events, and rare RNA isoforms. 

Primarily focusing on the transcriptome, which encompasses all RNA molecules produced in a cell, RNA-seq provides a detailed understanding of gene expression, alternative splicing events, and post-transcriptional modifications. RNA-seq is widely used in various biological studies, including gene expression profiling, biomarker discovery, and understanding the molecular mechanisms underlying diseases The workflow typically involves assessing data quality with tools like FastQC, trimming if necessary, mapping reads to a reference genome using algorithms like STAR, and estimating gene expression levels with tools such as featureCounts. Differential expression analysis, a significant step in the entire pipeline, involves identifying genes that show differential expression between samples and is usually performed using tools like DESeq2, edgeR, or GPSeq [1]. These tools employ various normalization processes to identify any changes in gene expression accurately.


### **Where is RNA-Sequencing Used?**

The versatility of RNA-seq lies in its ability to investigate a broad range of applications across different genomes, capturing both known and novel features of RNA and DNA sequences. It generates qualitative and quantitative data, providing a holistic view of the transcriptome rather than focusing on specific regions. Despite its benefits, RNA-seq does have limitations, including high costs, time-consuming library assembly, and inefficiencies in assay design. Additionally, challenges arise in identifying small transcripts accurately and addressing the background noise from highly abundant RNAs like rRNA, necessitating extensive cleaning and trimming steps that can be particularly time-consuming for unfamiliar RNA samples [1]. 

Nonetheless, the precision and sensitivity of RNA-seq make it an invaluable tool for unraveling the intricacies of gene regulation and expression. Since its introduction in the 2000s, RNA-seq has become an invaluable tool for bioinformaticians, as it has contributed to numerous discoveries and substantially increased researchers’ understanding of cellular processes, diseases, and more.


## **_Methods_**


### **RNA-Sequencing Pipeline**


#### **	Quality Control/Mapping**

RNA sequencing has a broad variety of applications however the pipeline is very similar. First, the reads have to be checked for quality and be cleaned. For this step, reads have to be fed into the FastQC command which generates an html report of the quality of the reads. Quality is measured by many metrics such as sequence quality, GC content, and library complexity. Each metric is labeled as pass or fail so a good set of reads should pass most of the metrics. The next step is to trim the reads using Trim Galore to trim off adapter sequences to get better alignments later in the pipeline. From there the reads are mapped to the reference genome using STAR with the trimmed fastq files as input. After that featureCounts is used to count the reads that fall in the annotated segments. featureCounts creates a bam file that can be opened using samtools to observe the aligned regions.



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


_An example of a FastQC report with a summary of the metrics indicating pass and fail along with the quality scores per base sequence_

_([https://hbctraining.github.io/Intro-to-rnaseq-hpc-salmon-flipped/lessons/07_qc_fastqc_assessment.html](https://hbctraining.github.io/Intro-to-rnaseq-hpc-salmon-flipped/lessons/07_qc_fastqc_assessment.html))_


#### **	Differential Sequencing Analysis**

Given that information, differential sequence analysis can be performed to observe gene expression of the regions of interest. DeSeq2 is an R package that is used to carry out this analysis but as a precondition, genes with low counts should be filtered out as they would not be expressed and increase the runtime unnecessarily. A few other alternative packages are edgeR and Limma. After differential sequence analysis, functional enrichment is performed to determine if other genes are enriched in another set. This can help determine biological function through similarity in genes. 


#### **Various Pipelines of RNA-Sequencing**

This pipeline can be altered a bit, particularly when mapping, depending on the data available. For example, in a study where the transcripts may be incomplete or missing, genome mapping can be performed but de novo reconstruction may need to be performed first to assemble lower expressed transcripts. This can be done using SOAPdenovo-Trans, Oasis, or Trinity [2]. If we have transcripts and there is no need for reconstruction, the reads can directly be mapped to the transcriptome using an ungapped mapper. However, if there is no reference genome, reads need to be assembled into contigs or transcripts which are mapped back to the reference transcriptome. 



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


_Variations to mapping techniques depending on data availability [2]_


## **_Applications/Significance_**

RNA sequencing provides us with an extremely useful dataset with a variety of useful applications. RNA-Seq provides us not only with genotypic data but also very useful information about gene expression and regulation. An understanding of which genes are being expressed and how they might respond to different stimuli allows us to more accurately and precisely draw connections between genotype and phenotype in organisms. This information provides us with a plethora of potential applications including differential gene expression, variants detection, allele-specific expression, small RNA profiling, alternative splicing patterns, systems biology, and single-cell RNA-Seq [3]. 

Analyzing expression levels is a fundamental and very traditional way of utilizing RNA-Seq data. RNA data is first extracted from our chosen biological samples and then fragmented into shorter RNA sequences. The RNA is then reverse transcribed into cDNA which we can amplify using PCR. Once our genetic samples are ready, we can sequence it using a platform such as Illumina. Now that we have the quantitative RNA-Seq data, we can process it. Initial steps include quality control, trimming, filtering, and alignment. Next, we can quantify the number of reads that align to regions of interest in our reference genome and normalize the data (so that we are able to conduct accurate comparisons). We can then utilize tools such as DESeq2 to conduct our differential expression analysis, telling us the difference in expression levels between different genomic regions, groups, or experimental conditions. Genetic annotation and visualization can help us analyze what the differences in expression mean in a biological context and share our results in concise ways [4].



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")


_An example of an RNA-Seq Differential Expression Pipeline (Vanderbilt Technologies for Advanced Genomics Analysis and Research Design, [www.bioinfo.vanderbilt.edu/vangard/services-rnaseq.html](www.bioinfo.vanderbilt.edu/vangard/services-rnaseq.html)_)


#### **Variant Discovery**

An application of RNA-Seq data is for Variant Discovery. RNA-Seq is specifically useful for the identification of SNVs and indel mutations within our genome. The process begins with a nearly identical process in the way we collect our biological samples, sequencing, and data pre-processing step as shown in the “Data Cleanup” section of the pipeline illustrated below[5]. The portions of the pipeline specific to Variant Discovery are the Variant Calling, Variant Filtering, and Variant Annotation process. Variant Calling aids us in identifying which reads contain genotypic variants when compared to our reference genome. It’s important to ensure that we are identifying solely genomic variants and not any transcriptomic variants. Variations to transcription are a result of modifications in the transcription process (such as alternative splicing or changes in gene expression/regulation) and not indicative of changes in the genome that the RNA is being transcribed from. Variant Filtering allows us to filter based on quality, read, depth, allele frequency, etc. to remove low-quality reads. Lastly, we will annotate the variants and predict the functional impact of the variants. RNA-Seq might be advantageous to utilizing DNA for variant detection because RNA-Seq focuses on solely the exome and ensures that all variants found have a direct impact beyond simply regulatory or intronic mutations. 



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")


_An example of a Variant Discovery Pipeline using the GATK platform_

_([https://gatk.broadinstitute.org/hc/en-us/articles/360035531192-RNAseq-short-variant-discovery-SNPs-Indels-](https://gatk.broadinstitute.org/hc/en-us/articles/360035531192-RNAseq-short-variant-discovery-SNPs-Indels-) )_


#### **Gene Fusion Prediction**

RNA sequencing can also be utilized for Gene Fusion Prediction. A gene fusion is a type of mutation in which different genes are conjoined, resulting in mutual transcription and translation. The regulatory elements of the genes are no longer distinct and the actual exomes are being controlled with the same regulatory elements. In many cases, this can result in over or under-expression of genes resulting in unintended phenotypic consequences. 



<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.png "image_tooltip")


_An illustration of cancer 2 kinase oncogenes being fused with a 3’ promoter, the phenotypic result being an overexpression of the kinase oncogenes leading to cancer_

_([https://www.clinicallab.com/the-power-of-rna-in-detecting-gene-fusions-for-cancer-diagnostics-27029](https://www.clinicallab.com/the-power-of-rna-in-detecting-gene-fusions-for-cancer-diagnostics-27029))_

Similar to Variant Detection, Gene Fusion prediction begins with the same foundational RNA-Seq pipeline that is used for differential gene expression. Upon the completion of the sequencing, filtering, and alignment, we can begin utilizing Fusion Detection algorithms such as STAR-Fusion, TopHat-Fusion, or FusionCatcher. These will look over our aligned reads to identify potential gene fusions that we can then filter, visualize, and annotate to better understand and analyze our results. Once we look at the predicted fusion results, we can validate them using experimental techniques such as Sanger sequencing or targeted RNA-Seq. The fusions we identify are very useful for clinical applications, specifically in cancer diagnosis and treatment, as therapeutic interventions can specifically target these gene fusions. 


## **_Discussion_**

RNA-seq has become a powerful tool that we use in bioinformatics, providing valuable insights into gene expression, transcriptomics, and variant identification. Various methods, such as library preparation, sequencing platforms, and bioinformatics tools, are used to ensure accurate and comprehensive analysis. Moreover, its application extends to variant calling, enabling the identification of SNPs, insertions, deletions, and other genetic variations. As technology continues to evolve, RNA-seq is poised to remain at the forefront of genomic research, contributing significantly to personalized medicine and precision diagnostics.

Furthermore, the impact of RNA sequencing goes beyond its immediate applications in molecular biology. As the field progresses, RNA-seq plays a vital role in understanding cellular regulation, not only through the identification of differentially expressed genes but also by highlighting the importance of non-coding RNAs, alternative splicing events, and post-transcriptional modifications. Moreover, the integration of RNA-seq data with other genomics technologies, such as proteomics, gives us the potential to fully understand complex biological systems. As RNA-seq methodologies continue to grow and become increasingly accessible, their potential extends to offering valuable new scientific discoveries that can revolutionize an immense amount of upcoming research. 


## **_Future Directions_**

Some future directions of RNA sequencing include being able to target more complex transcriptomes. Currently, RNA-seq can accurately detect and analyze multiple regions of the transcriptome without major problems. However, further research by Dr. Zhong Wong looks to study transcriptomes that contain rare RNA isoforms from across all types of genomes. Technological advancements such as pair-end sequencing, strand-specific sequencing, and the utilization of longer reads contribute to its ability to target complex transcriptomes and identify rare RNA isoforms [6]. This progress enhances accuracy in detecting variants, including single nucleotide polymorphisms (SNPs) and genetic variations. The broad dynamic range of RNA-Seq allows for the analysis of highly and lowly expressed genes within the same sample, which can be useful for analyzing extensive transcriptome regions and complex genomic sequences. 

Looking ahead, RNA-seq will be instrumental in the era of personalized medicine and precision diagnostics. Its ability to provide a comprehensive understanding of individual genomes holds the promise of creating medical technologies that are extremely precise and unique for individual use. As costs continue to decrease and methodologies become more streamlined, RNA-seq looks to be a major factor in genomics, with far-reaching implications for our understanding of biology and the development of targeted therapeutic strategies. 

**_References:_**



1. Ruairi, Mackenzie J. “RNA-Seq: Basics, Applications and Protocol.” Genomics Research from Technology Networks, [www.technologynetworks.com/genomics/articles/rna-seq-basics-applications-and-protocol-299461](www.technologynetworks.com/genomics/articles/rna-seq-basics-applications-and-protocol-299461).
2. Conesa, Ana, et al. “A Survey of Best Practices for RNA-Seq Data Analysis - Genome Biology.” BioMed Central, BioMed Central, 26 Jan. 2016, [www.genomebiology.biomedcentral.com/articles/10.1186/s13059-016-0881-8](www.genomebiology.biomedcentral.com/articles/10.1186/s13059-016-0881-8).
3.  “Applications of RNA-Seq.” Applications of RNA-Seq - CD Genomics, [www.cd-genomics.com/resourse-applications-of-rna-seq.html](www.cd-genomics.com/resourse-applications-of-rna-seq.html).
4. Koch, Clarissa M, and Stephen F Chiu. “A Beginner’s Guide to Analysis of RNA Sequencing Data.” American Journal of Respiratory Cell and Molecular Biology, U.S. National Library of Medicine, Aug. 2018, [www.ncbi.nlm.nih.gov/pmc/articles/PMC6096346/#:~:text=A%20major%20goal%20of%20RNA,tissue%20homogenates%2C%20or%20sorted%20cells](www.ncbi.nlm.nih.gov/pmc/articles/PMC6096346/#:~:text=A%20major%20goal%20of%20RNA,tissue%20homogenates%2C%20or%20sorted%20cells).
5. Caetano-Anolles, Dere. “RNAseq Short Variant Discovery (Snps + Indels)”. Genome Analysis Toolkit. 26 Nov. 2023 , [www.gatk.broadinstitute.org/hc/en-us/articles/360035531192-RNAseq-short-variant-discovery-SNPs-Indels-](www.gatk.broadinstitute.org/hc/en-us/articles/360035531192-RNAseq-short-variant-discovery-SNPs-Indels-)
6. Wang, Zhong, et al. “RNA-Seq: A Revolutionary Tool for Transcriptomics.” Nature Reviews. Genetics, U.S. National Library of Medicine, Jan. 2009, [www.ncbi.nlm.nih.gov/pmc/articles/PMC2949280/#:~:text=Future%20directions,RNA%20isoforms%20from%20all%20genes](www.ncbi.nlm.nih.gov/pmc/articles/PMC2949280/#:~:text=Future%20directions,RNA%20isoforms%20from%20all%20genes).
7. McGee, Christopher. “The Power of RNA in Detecting Gene Fusions for Cancer Diagnostics.” _Today’s Clinical Lab_, [www.clinicallab.com/the-power-of-rna-in-detecting-gene-fusions-for-cancer-diagnostics-27029](www.clinicallab.com/the-power-of-rna-in-detecting-gene-fusions-for-cancer-diagnostics-27029).
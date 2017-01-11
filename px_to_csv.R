##to run the script use Rscript px_to_csv.R [inputFile] [outputFile]

library(pxR)
args <- commandArgs(trailingOnly = TRUE)
print(args[1])
print(args[2])
my.px.object <- read.px(args[1], encoding='iso88591', na.strings = c('"."','".."','"..."','"...."','"......"','":"'))
my.px.data   <-  as.data.frame(my.px.object)
write.csv(my.px.data, file = args[2])

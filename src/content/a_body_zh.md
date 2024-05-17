## 自动化

自动化是MIES行业的关键方面，大规模项目需要高效准确的翻译工作流程。自动化工具被广泛采用以简化翻译流程，提高生产力，减少错误。在本章中，我们提议将自动化工具集成到CSTM的翻译工作流程中，以优化效率并提升翻译质量。

### 变量

在计算机科学中，变量是描述性名称，它们引用主存储器中的位置^[BROOKSHEAR J G, BRYLOW D. Computer science: An overview[M]. Harlow etc.: Pearson, 2020.]。为了简单起见，我们可以将变量视为一个术语的别名，允许该术语翻译一次并多次使用。如果别名拼写错误，应显示明确的错误消息通知翻译者。

以下是Unknown Worlds Entertainment在*Subnautica: Below Zero*中使用变量的示例。表3显示了英语的完整句子及其相应的德语翻译。变量`{0}`代表项目名称，如表4所示。使用变量和项目名称的结果展示在表5中。

<div class="caption">变量使用示例</div>

| 源文本 (英语)                                   | 目标文本 (德语)                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| Inventory full. Free some space to pick up {0}. | Inventar voll. Schaffe etwas Platz, um {0} aufzuheben.           |
| {0} added to vehicle storage.                   | {0} im Frachtraum abgelegt.                                      |
| Crafting of {0} is complete. Ready for pickup.  | Die Herstellung von {0} ist abgeschlossen. Fertig zum Mitnehmen. |

<div class="caption">项目名称示例</div>

| 源文本 (英语)    | 目标文本 (德语) |
| ---------------- | --------------- |
| Antidote         | Gegenmittel     |
| Synthetic fibers | Synthetikfasern |
| Polyaniline      | Polyanilin      |

<div class="caption">使用变量和项目名称的可能结果</div>

| 源文本 (英语)                                                | 目标文本 (德语)                                                              |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Inventory full. Free some space to pick up Antidote.         | Inventar voll. Schaffe etwas Platz, um Gegenmittel aufzuheben.               |
| Inventory full. Free some space to pick up Synthetic fibers. | Inventar voll. Schaffe etwas Platz, um Synthetikfasern aufzuheben.           |
| Inventory full. Free some space to pick up Polyaniline.      | Inventar voll. Schaffe etwas Platz, um Polyanilin aufzuheben.                |
| Antidote added to vehicle storage.                           | Gegenmittel im Frachtraum abgelegt.                                          |
| Synthetic fibers added to vehicle storage.                   | Synthetikfasern im Frachtraum abgelegt.                                      |
| Polyaniline added to vehicle storage.                        | Polyanilin im Frachtraum abgelegt.                                           |
| Crafting of Antidote is complete. Ready for pickup.          | Die Herstellung von Gegenmittel ist abgeschlossen. Fertig zum Mitnehmen.     |
| Crafting of Synthetic fibers is complete. Ready for pickup.  | Die Herstellung von Synthetikfasern ist abgeschlossen. Fertig zum Mitnehmen. |
| Crafting of Polyaniline is complete. Ready for pickup.       | Die Herstellung von Polyanilin ist abgeschlossen. Fertig zum Mitnehmen.      |

这些示例表明，项目名称和句子都只翻译一次。有三种项目名称和三个句子，最多有九种可能的结果，所有结果在语法和拼写上都是正确的，前提是翻译准确。使用变量减少了重复工作，并在术语或稍微修改的句子多次出现时最小化了不一致性的可能性。

请注意，变量不一定是`{0}`。它们的格式取决于处理变量的解析器或程序。在*Subnautica: Below Zero*的情况下，使用`{`和`}`是因为它们很少出现在正常句子中，而`0`代表文本中使用的第一个变量。单个文本字符串中的更多变量显示为`{1}`，`{2}`等。其他常见的变量格式包括`{{0}}`, `%0%`, `<<0>>`等。用数字命名的列表变量在科学博物馆的背景下不太合适。像`{操作指南}`, `{{操作指南}}`, `%操作指南%`, 或 `<<操作指南>>`这样的命名变量在这种情况下更好。如前所述，`操作指南`在CSTM中已经被翻译成了几种不同的英文术语。使用这样的变量确保`操作指南`只翻译一次，并且所有其他用途都引用这个变量，显著减少了不一致性。

### 自动文本导入

基于我们之前的评估，显然许多错误源于手动操作。这一点的隐含指示是展品标签中不完整的英文描述的存在。有些缺少了句末标点，而其他一些则缺少一个或多个句子。

前者很可能是手动复制和粘贴的结果。可以想象这样一种场景，一位英语不熟练的员工从翻译者那里收到翻译文本，并负责将翻译文本输入到计算机上的标签中。在这种情况下，由于准确操作鼠标将光标定位在成千上万个展品的翻译文本的开头和结尾的挑战，错误容易发生。

后者问题可能是由于工作环境中缺乏细致导致的。回到场景中，面对众多翻译的员工可能旨在加快任务进度，无意中忽略了标签没有提供足够的空间用于英文描述，英文描述通常超过中文对应部分的长度，但占用相同的空间。因此，溢出的文本保持隐藏，给观众留下了不完整的描述。

类似地，其他问题也会出现。例如，当文本包含中英文混合时，必须手动调整字体以确保正确显示。鉴于这类重复任务的巨大规模，人类几乎不可避免地会犯错误，因此字体相关问题会间歇性地出现。

在MIES行业，翻译通常自动导入。通常要求翻译者使用Microsoft Word或Excel执行他们的任务，因为大多数人不熟悉其他工具，而且对他们进行这些工具的培训成本高昂且耗时。MIES行业的工程师避免手动复制和粘贴翻译文本到指定区域，而是选择开发程序进行自动文本导入。这种方法证明对于大型项目来说非常高效和准确。通过消除人为参与，这些工具减少了，甚至消除了不归因于翻译者的额外错误的可能性。

我们开发了一个用于自动处理展品标签的应用程序，它在GitHub上开源，地址是[this repository](https://github.com/XiaoSong-CPE/exhibit-label-generator)。目前，它作为一个原型运作，没有批量处理能力，主要是因为不确定翻译者将向CSTM（中国科学技术博物馆）提交的文件类型。常见的文件格式如`.txt`, `.xml` 和 `.xlsx`可以轻松处理，每种都需要不同的代码实现。没有精确了解CSTM使用的文件类型，我们避免投入时间开发每个常用格式的功能。

![我们的应用程序的屏幕截图](exhibit-label-generator-0.png)

我们的应用程序的主要功能是从纯文本生成可打印材料，如图像。它解决了排版问题，纠正了基本的拼写错误，并在空间不足时自动调整字体大小。以下是两张图片，比较了CSTM的标签和其生成的对应物。请注意，装饰图案图像没有包括在内，因为我们没有图像。

![CSTM的标签](exhibit-label-generator-1.jpg)

![生成的可打印材料](exhibit-label-generator-2.png)

应用程序的基本原理很简单。首先，应用程序获取文本，无论是在原型中手动输入还是根据CSTM上下文中的实时输入方法。其次，它使用HTML（超文本标记语言）和CSS（层叠样式表）排版文本，在这个阶段解决所有排版问题。第三，它使用JS（JavaScript）检测任何文本溢出，并相应地调整文本大小。这个过程确保了无错误的可打印材料的结果。通过小的调整，这个原型可以轻松过渡到生产就绪的应用程序。

虽然我们的应用程序在简化流程方面提供了显著的帮助，但它并没有解决每个方面。更重要的是，这个项目证明了自动化系统可以无缝集成到像CSTM这样的传统翻译工作流程中。在工作流程中实施自动化概念不仅加快了工作流程，还最小化了额外错误的发生可能性。

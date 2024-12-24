def outputTitle():
    title1 = list(); title2 = list(); title3 = list(); title = (title1, title2, title3)
    tl = ['AC', 'ME', 'DE']
    for i in range(3):
        with open('data/{}/note.txt'.format(tl[i]), 'r', encoding='utf-8') as f:
            for line in f.readlines():
                templ = line.strip('\n')
                if templ:
                    tempL = templ.split(' / ')
                title[i].append(tempL[0])

    return title


def outputInfo():
    info1 = list(); info2 = list(); info3 = list(); info = (info1, info2, info3)
    tl = ['AC', 'ME', 'DE']

    for i in range(3):
        with open('data/{}/note.txt'.format(tl[i]), 'r', encoding='utf-8') as f:
            for line in f.readlines():
                templ = line.strip('\n')
                if templ:
                    tempL = templ.split(' / ')
                    if i == 0:
                        tempD = {
                            'titleK': tempL[0],
                            'titleE': tempL[1],
                            'author': tempL[2].split(' · '),
                            'abstract': tempL[3],
                            'keywords': tempL[4].split(', '),
                            'id': tempL[5]
                        }
                    else:
                        tempD = {
                            'titleK': tempL[0],
                            'titleE': tempL[1],
                            'author': tempL[2].split(' · '),
                            'abstract': tempL[3],
                            'id': tempL[4]
                        }
                    info[i].append(tempD)
    return info

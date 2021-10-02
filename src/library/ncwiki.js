import WikiService from '@/service/wiki';
import WikiTag from '@/constants/WikiTag';

export default class NCWIKI {
    static async view(str) {
        let contents;
        let content = str;
        [contents, content] = this.getContents(content);
        content = await this.getLinks(content);
        contents = `<div class="card card-body bg-light p-4">${contents}</div>`;
        content = `<div class="wiki-content pt-3">${content}</div>`;
        content = content.replace(/\n/g, '</div><div class="wiki-content pt-3">');
        return contents + content;
    }

    static getContents(str) {
        let contents = '';
        // 문단 번호 (3번째는 2번째의 하위 항목을 의미)
        const contentsNumber = [0, 0, 0, 0, 0, 0];
        // 위치
        let contentsIndex = 0;
        const ContentsTag = WikiTag.CONTENTS_LETTERS.repeat(2);
        while ((contentsIndex = str.indexOf(ContentsTag, contentsIndex)) !== -1) {
            // '!' 와 비교
            if (contentsIndex > 0 && str.charAt(contentsIndex - 1) === WikiTag.COMMENT) {
                str = str.substring(0, contentsIndex - 1) + str.substring(contentsIndex);
                contentsIndex = contentsIndex + 2;
                continue;
            }
            let contentsCount = 0;
            let p = contentsIndex;

            // 어디 문단인지 확인
            while (str.charAt(p++) === WikiTag.CONTENTS_LETTERS) {
                ++contentsCount;
            }

            const [contentsE, contentsELength] = this.getTextWithLength(str, p - 1, WikiTag.CONTENTS_LETTERS.repeat(contentsCount));
            contentsNumber[contentsCount]++;

            for (let i = contentsCount + 1; i <= 6; i++) {
                contentsNumber[i] = 0;
            }

            let contentNo = '';
            for (let i = 2; i <= contentsCount; i++) {
                contentNo = contentNo + contentsNumber[i] + '.';
            }

            let contentsId = contentNo.replace('.', '-');

            const contentHtml =
                `<h${contentsCount} class="wiki-content-title" id="c${contentsId}"><a class="wiki-contents-link" href="#contents">${contentNo}</a> ${contentsE}</h${contentsCount}>`;

            contents += `<p class="ps-${contentsCount} wiki-contents-list"><a class="wiki-contents-link" href="#c${contentsId}">${contentNo}</a> ${contentsE}</p>`;

            str = str.substr(0, contentsIndex) + contentHtml + str.substr(contentsIndex + contentsCount + contentsELength + contentsCount + 1);

            contentsIndex = contentsIndex + contentHtml.length;
        }
        return [contents, str];
    }

    static async getLinks(str) {
        let strIndex = 0;
        while ((strIndex = str.indexOf(WikiTag.LINK_OPEN, strIndex)) !== -1) {
            // '!' 와 비교
            if (strIndex > 0 && str.charAt(strIndex - 1) === WikiTag.COMMENT) {
                str = str.substring(0, strIndex - 1) + str.substring(strIndex);
                strIndex = strIndex + 2;
                continue;
            }

            let [link, linkLength] = this.getTextWithLength(str, strIndex + 2, WikiTag.LINK_CLOSE);
            let linkText;

            link = link.split('|');

            if (link.length === 1) {
                linkText = link = link[0];
            } else {
                linkText = link[0];
                link = link[1];
            }

            let linkHtml;

            if (link.indexOf('http://') === 0 || link.indexOf('https://') === 0) {
                if (await this.isImage(link)) {
                    linkHtml = `<img class="wiki-image" src="${link}" alt="${linkText}" title="${linkText}"/>`;
                } else {
                    linkHtml = `<a class="wiki-external-link" target="_blank" href="${link}" title="${link}">${linkText}</a>`;
                }
            } else {
                // 특수문자
                link = link.split('#');
                const wikiName = link[0];
                let encodeUrl = encodeURIComponent(wikiName);
                if (link.length === 2) {
                    encodeUrl = encodeUrl + '#' + link[1];
                }
                const urlClass = (await WikiService.getWiki(wikiName)).data.wiki === null ? 'wiki-link-not-found' : 'wiki-internal-link';

                linkHtml = `<a class="${urlClass}" href="/wiki/search/${encodeUrl}" title="${wikiName}">${linkText}</a>`;
            }

            str = str.substr(0, strIndex) + linkHtml + str.substr(strIndex + 2 + linkLength + 2);

            strIndex = strIndex + linkHtml.length;
        }

        return str;
    }

    static getTextWithLength(str, pos, token) {
        const strLength = str.length;
        const tokenLength = token.length;

        let c = 0;

        while (pos + c < strLength && (str.substr(pos + c, tokenLength) !== token || str.charAt(pos + c - 1) === WikiTag.COMMENT)) {
            ++c;
        }

        return [str.substr(pos, c), c];
    }

    static async isImage(url) {
        const r = await fetch(url);
        return r.headers.get('Content-Type').indexOf('image') !== -1;
    }
}
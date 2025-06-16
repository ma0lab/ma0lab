// 目次(TOC)自動生成スクリプト
document.addEventListener('DOMContentLoaded', function() {
    // 目次を生成する関数
    function generateTOC() {
        // blog-content内のh2, h3要素を取得
        const headings = document.querySelectorAll('.blog-content h2, .blog-content h3');
        
        if (headings.length === 0) {
            return; // 見出しがない場合は何もしない
        }

        // 目次コンテナを作成
        const tocContainer = document.createElement('div');
        tocContainer.className = 'toc-container';
        
        const tocTitle = document.createElement('div');
        tocTitle.className = 'toc-title';
        tocTitle.textContent = '目次';
        
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';
        
        // 各見出しに対してIDを設定し、目次リンクを作成
        headings.forEach((heading, index) => {
            // 見出しにIDを設定（既にIDがある場合は使用）
            if (!heading.id) {
                heading.id = `heading-${index + 1}`;
            }
            
            // 目次のリストアイテムを作成
            const listItem = document.createElement('li');
            listItem.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';
            
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            link.className = 'toc-link';
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        tocContainer.appendChild(tocTitle);
        tocContainer.appendChild(tocList);
        
        // 最初のH2の直前に目次を挿入
        const blogContent = document.querySelector('.blog-content');
        const firstH2 = blogContent.querySelector('h2');
        
        if (firstH2) {
            blogContent.insertBefore(tocContainer, firstH2);
        } else {
            // H2がない場合は最初に挿入
            const firstChild = blogContent.firstChild;
            blogContent.insertBefore(tocContainer, firstChild);
        }
        
        // スムーススクロールの設定
        setupSmoothScroll();
    }
    
    // スムーススクロール機能
    function setupSmoothScroll() {
        const tocLinks = document.querySelectorAll('.toc-link');
        
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // 目次を生成
    generateTOC();
});
<?php

class ModuleWrOnepage extends \Module {

    protected $strTemplate = 'mod_wr_onepage';
    protected function compile()
    {
        global $objPage;
        if($this->rootPage){
            $Articles=\Contao\ArticleModel::findByPid($this->rootPage);
            $rootPageId=\Contao\PageModel::findById($this->rootPage);
            $this->Template->uri = $rootPageId->alias.".html";
        } else{
            $Articles=\Contao\ArticleModel::findByPid($objPage->id);
            $this->Template->uri = $_ENV['REQUEST_URI'];
        }
        $arrArticle = array();
        foreach($Articles as $article){
            if(strlen($article->in_onepage && $article->published)){
                array_push($arrArticle,
                    array(
                        'title'=>$article->title,
                        'alias'=>$article->alias
                    )
                );
            }
        }
        $this->Template->arrArticle = $arrArticle;
    }
}
<?php
namespace huseyinfiliz\ShowPassword;
use Flarum\Extend;
return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')
        ->js(__DIR__ . '/js/dist/forum.js'),
];

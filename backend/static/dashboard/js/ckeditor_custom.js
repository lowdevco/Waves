CKEDITOR.editorConfig = function( config ) {
    // Preserve empty <i> and <span> tags for FontAwesome icons
    CKEDITOR.dtd.$removeEmpty.i = 0;
    CKEDITOR.dtd.$removeEmpty.span = 0;
    CKEDITOR.dtd.$removeEmpty.div = 0;
};

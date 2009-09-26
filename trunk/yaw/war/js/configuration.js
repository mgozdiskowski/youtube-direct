// namespace protection against collision
var admin = admin || {};
admin.config = admin.config || {};

admin.config.init = function() {
  var saveButton = jQuery('#saveButton');     
  
  admin.config.getAdminConfig(function(data) {
    jQuery('#developerKey').val(data.developerKey);
    jQuery('#clientId').val(data.clientId);
    jQuery('#youTubeUsername').val(data.youTubeUsername);
    jQuery('#youTubePassword').val(data.youTubePassword);
    jQuery('#defaultTag').val(data.defaultTag);
    jQuery('#linkBackText').val(data.linkBackText);
    jQuery('#moderationMode').val(data.moderationMode);
    jQuery('#newSubmissionAddress').val(data.newSubmissionAddress);
    jQuery('#brandingMode').val(data.brandingMode);
    jQuery('#loginInstruction').val(unescape(data.loginInstruction));
    jQuery('#fromAddress').val(data.fromAddress);
    jQuery('#approvalEmailText').val(unescape(data.approvalEmailText));
    jQuery('#rejectionEmailText').val(unescape(data.rejectionEmailText));
    
    if (data.moderationEmail) {
      jQuery('#moderationEmail').attr('checked', true);
      admin.config.toggleModerationEmailTextDiv(true);
    } else {
      jQuery('#moderationEmail').attr('checked', false);
      admin.config.toggleModerationEmailTextDiv(false);
    }
  });
  
  saveButton.click(function() {
    admin.config.persistAdminConfig();
  });
  
  jQuery('#moderationEmail').click(function() {
    admin.config.toggleModerationEmailTextDiv();
  });
};

admin.config.toggleModerationEmailTextDiv = function(isVisible) {
  if (isVisible == null) {
    isVisible = jQuery('#moderationEmailTextDiv').css("display") == "none" ? true : false;
  }
  
  var displayStyle = isVisible ? 'inline' : 'none';
  
  jQuery('#moderationEmailTextDiv').css("display", displayStyle);
}

admin.config.getAdminConfig = function(callback) {
  var ajaxCall = {};
  ajaxCall.type = 'GET';
  ajaxCall.url = '/admin/GetAdminConfig';
  ajaxCall.dataType = 'json'; // expecting back
  ajaxCall.processData = false;
  ajaxCall.error = function(xhr, text, error) {
    console.log('Get admin config incurred an error: ' + xhr.statusText);
  };
  ajaxCall.success = function(res) {
    admin.config.showLoading(false);
    callback(res);
  };
  admin.config.showLoading(true, "loading ...");
  jQuery.ajax(ajaxCall);     
};

admin.config.persistAdminConfig = function() {
  var developerKey = jQuery('#developerKey').val();   
  var clientId = jQuery('#clientId').val();
  var youTubeUsername = jQuery('#youTubeUsername').val();
  var youTubePassword = jQuery('#youTubePassword').val();
  var defaultTag = jQuery('#defaultTag').val();
  var linkBackText = jQuery('#linkBackText').val();
  var moderationMode = jQuery('#moderationMode').val();
  var newSubmissionAddress = jQuery('#newSubmissionAddress').val();
  var brandingMode = jQuery('#brandingMode').val();
  var submissionMode = jQuery('#submissionMode').val();
  var loginInstruction = escape(jQuery('#loginInstruction').val());
  var moderationEmail = jQuery('#moderationEmail').attr('checked');
  var fromAddress = jQuery('#fromAddress').val();
  var approvalEmailText = escape(jQuery('#approvalEmailText').val());
  var rejectionEmailText = escape(jQuery('#rejectionEmailText').val());
  
  var jsonObj = {};
  jsonObj.developerKey = developerKey;
  jsonObj.clientId = clientId;
  jsonObj.youTubeUsername = youTubeUsername;
  jsonObj.youTubePassword = youTubePassword;
  jsonObj.defaultTag = defaultTag;
  jsonObj.linkBackText = linkBackText;
  jsonObj.moderationMode = moderationMode;
  jsonObj.newSubmissionAddress = newSubmissionAddress;
  jsonObj.brandingMode = brandingMode;  
  jsonObj.submissionMode = submissionMode;  
  jsonObj.loginInstruction = loginInstruction;
  jsonObj.moderationEmail = moderationEmail;
  jsonObj.fromAddress = fromAddress;
  jsonObj.approvalEmailText = approvalEmailText;
  jsonObj.rejectionEmailText = rejectionEmailText;
  
  var ajaxCall = {};
  ajaxCall.type = 'POST';
  ajaxCall.url = '/admin/PersistAdminConfig';
  ajaxCall.data = JSON.stringify(jsonObj);
  ajaxCall.dataType = 'json'; // expecting back
  ajaxCall.processData = false;
  ajaxCall.error = function(xhr, text, error) {
    admin.config.showLoading(true, 'Persist admin config incurred an error: ' + xhr.statusText);
  };
  ajaxCall.success = function(res) {
    admin.config.showLoading(false);
  };
  admin.config.showLoading(true, 'saving ...');
  jQuery.ajax(ajaxCall);    
};

admin.config.showLoading = function(status, text) {
  if (status) {
    text = text || 'loading ...';
    jQuery('#configurationStatus').html(text).show();
  } else {
    jQuery('#configurationStatus').html('').hide();
  }
};
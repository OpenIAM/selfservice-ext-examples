package org.openiam.ui.selfservice.ext.web.mvc;

import org.openiam.ui.util.messages.ErrorToken;
import org.openiam.ui.web.model.BasicAjaxResponse;
import org.openiam.ui.web.mvc.AbstractController;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public abstract class AbstractSelfServiceExtController extends AbstractController {


    protected String getRequesterId() {
        return cookieProvider.getUserId(getCurrentHttpServletRequest());
    }

    protected String getRequesterPrincipal() {
        return getRequesterPrincipal(getCurrentHttpServletRequest());
    }

    protected BasicAjaxResponse prepareAjaxResponse(Errors errors) throws IOException {
        BasicAjaxResponse ajaxResponse = new BasicAjaxResponse();
        ajaxResponse.setStatus(500);
        for (ObjectError err: errors.getAllErrors()) {
            ErrorToken errorToken = new ErrorToken(org.openiam.ui.util.messages.Errors.INTERNAL_ERROR);
            errorToken.setMessage(messageSource.getMessage(err.getCode(), err.getArguments(), err.getDefaultMessage(), localeResolver.resolveLocale(getCurrentHttpServletRequest())));
            ajaxResponse.addError(errorToken);
        }
        List<FieldError> fieldErrors = new ArrayList<>();
        for (FieldError fe : errors.getFieldErrors()) {
            FieldError fieldError = new FieldError(fe.getObjectName(), fe.getField(), messageSource.getMessage(fe.getCode(), fe.getArguments(), fe.getDefaultMessage(), localeResolver.resolveLocale(getCurrentHttpServletRequest())));
            fieldErrors.add(fieldError);
        }
        ajaxResponse.addContextValues("fieldErrors", jacksonMapper.writeValueAsString(fieldErrors));
        return ajaxResponse;
    }
}

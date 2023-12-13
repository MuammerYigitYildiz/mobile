import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from './authentication.service';

/** appHasRole="['ROLE_APP_ADMIN']" */
@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authenticationService: AuthenticationService) {
  }

  @Input() set appHasPermission(reqRoles: Array<string>) {
    const hasDefined = this.authenticationService.hasAnyPermission(reqRoles);
    if (hasDefined && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasDefined && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

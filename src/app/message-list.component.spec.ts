import {
  describe, it, expect, inject, injectAsync, beforeEach, TestComponentBuilder,
  ComponentFixture, beforeEachProviders, setBaseTestProviders,
} from "angular2/testing";
import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS,
} from "angular2/platform/testing/browser";

import {MessageListComponent} from "./message-list.component";
import {MessageService} from "./message.service";

describe("MessageListComponent", () => {
  let fixture: ComponentFixture;

  setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS,
                       TEST_BROWSER_APPLICATION_PROVIDERS);

  beforeEachProviders(() => [MessageService]);

  beforeEach(injectAsync([TestComponentBuilder], tcb =>
    tcb.createAsync(MessageListComponent).then(f => fixture = f)
  ));

  it("should have list of message", () => {
    // Given a component instance with some messages
    let messageListComponent = fixture.componentInstance;
    messageListComponent.messageList = ["msg1", "msg2"];

    // When we trigger the change detection
    fixture.detectChanges();

    // Then we should have some messages display
    let messageList = fixture.nativeElement.querySelectorAll("li");
    expect(messageList.length).toBe(2);
  });
});
import * as React from 'react';

export namespace CometChat {
    export interface AssistantBaseEventData {
        timestamp: number;
        runId: string;
        threadId: string;
        [key: string]: any;
    }

    export class AIAssistantBaseEvent<T extends AssistantBaseEventData = AssistantBaseEventData> {
        type: string;
        conversationId: string;
        messageId: string;
        parentId: string;
        data: T;
        constructor(type: string, conversationId: string, messageId: string, parentId: string, data: T);
        getType(): string;
        setType(type: string): void;
        getConversationId(): string;
        setConversationId(conversationId: string): void;
        getMessageId(): string;
        setMessageId(messageId: string): void;
        getParentId(): string;
        setParentId(parentId: string): void;
        getData(): T;
        setData(data: T): void;
        getTimestamp(): number;
        setTimestamp(timestamp: number): void;
        getRunId(): string;
        setRunId(runId: string): void;
        getThreadId(): string;
        setThreadId(threadId: string): void;
        toJSON(): object;
        static fromJSON(json: any): AIAssistantBaseEvent;
    }

    export interface AssistantRunStartedEventData extends AssistantBaseEventData {
        [key: string]: any;
    }
    export class AIAssistantRunStartedEvent extends AIAssistantBaseEvent<AssistantRunStartedEventData> {}

    export interface AssistantRunFinishedEventData extends AssistantBaseEventData {
        [key: string]: any;
    }
    export class AIAssistantRunFinishedEvent extends AIAssistantBaseEvent<AssistantRunFinishedEventData> {}

    export interface AssistantMessageStartedEventData extends AssistantBaseEventData {
        role: string;
        [key: string]: any;
    }
    export class AIAssistantMessageStartedEvent extends AIAssistantBaseEvent<AssistantMessageStartedEventData> {}

    export interface AssistantMessageEndedEventData extends AssistantBaseEventData {
        [key: string]: any;
    }
    export class AIAssistantMessageEndedEvent extends AIAssistantBaseEvent<AssistantMessageEndedEventData> {}

    export interface AssistantContentEventData extends AssistantBaseEventData {
        delta: string;
        [key: string]: any;
    }
    export class AIAssistantContentReceivedEvent extends AIAssistantBaseEvent<AssistantContentEventData> {
        constructor(
            conversationId: string,
            messageId: string,
            parentId: string,
            data: AssistantContentEventData
        );
        /**
         * Gets the delta value for the content received event
         * @returns The delta string
         */
        public getDelta(): string;

        /**
         * Sets the delta value for the content received event
         * @param delta - The delta string to set
         */
        public setDelta(delta: string): void;
    }

    export interface AssistantToolStartedEventData extends AssistantBaseEventData {
        toolCallId: string;
        toolCallName: string;
        displayName: string;
        executionText: string;
        [key: string]: any;
    }
    export class AIAssistantToolStartedEvent extends AIAssistantBaseEvent<AssistantToolStartedEventData> {}

    export interface AssistantToolArgumentEventData extends AssistantBaseEventData {
        toolCallId: string;
        delta: string;
        [key: string]: any;
    }
    export class AIAssistantToolArgumentEvent extends AIAssistantBaseEvent<AssistantToolArgumentEventData> {}

    export interface AssistantToolEndedEventData extends AssistantBaseEventData {
        toolCallId: string;
        [key: string]: any;
    }
    export class AIAssistantToolEndedEvent extends AIAssistantBaseEvent<AssistantToolEndedEventData> {}

    export interface AssistantToolResultEventData extends AssistantBaseEventData {
        toolCallId: string;
        content: string;
        role: string;
        [key: string]: any;
    }
    export class AIAssistantToolResultEvent extends AIAssistantBaseEvent<AssistantToolResultEventData> {}

    export interface AssistantCardStartedEventData extends AssistantBaseEventData {
        cardId: string;
        executionText: string;
        streamMessageId: string;
        [key: string]: any;
    }
    export class AIAssistantCardStartedEvent extends AIAssistantBaseEvent<AssistantCardStartedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantCardStartedEventData);
        getCardId(): string;
        setCardId(cardId: string): void;
        getExecutionText(): string;
        setExecutionText(executionText: string): void;
        getStreamMessageId(): string;
        setStreamMessageId(streamMessageId: string): void;
    }

    export interface AssistantCardReceivedEventData extends AssistantBaseEventData {
        cardId: string;
        card: object;
        streamMessageId: string;
        [key: string]: any;
    }
    export class AIAssistantCardReceivedEvent extends AIAssistantBaseEvent<AssistantCardReceivedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantCardReceivedEventData);
        getCardId(): string;
        setCardId(cardId: string): void;
        getCard(): object;
        setCard(card: object): void;
        getStreamMessageId(): string;
        setStreamMessageId(streamMessageId: string): void;
    }

    export interface AssistantCardEndedEventData extends AssistantBaseEventData {
        cardId: string;
        streamMessageId: string;
        [key: string]: any;
    }
    export class AIAssistantCardEndedEvent extends AIAssistantBaseEvent<AssistantCardEndedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantCardEndedEventData);
        getCardId(): string;
        setCardId(cardId: string): void;
        getStreamMessageId(): string;
        setStreamMessageId(streamMessageId: string): void;
    }

    /**
      *
      * @module AIAssistantMessage
      */
    export class AIAssistantMessageData {
        runId: string;
        threadId: string;
        text: string;
        constructor(runId: string, threadId: string, text: string);
        getRunId(): string;
        setRunId(runId: string): void;
        getThreadId(): string;
        setThreadId(threadId: string): void;
        getText(): string;
        setText(text: string): void;
    }
    export class AIAssistantMessage extends BaseMessage implements Message {
        protected data?: any;
        protected aiAssistantMessageData?: AIAssistantMessageData;
        constructor(receiverId: string, receiverType: string);
        /**
            * Method to get sender of the message.
            * @returns {User}
            */
        getSender(): User;
        /**
            * Method to get receiver of the message.
            * @returns {User | Group}
            */
        getReceiver(): User | Group;
        /**
            * Method to get data of the message.
            * @returns {AIAssistantMessageData}
            */
        getAssistantMessageData(): AIAssistantMessageData;
        /**
            * Method to set data of the message.
            * @param {AIAssistantMessageData} data
            */
        setAssistantMessageData(data: AIAssistantMessageData): void;
        /**
            * Method to get data of the message.
            * @returns {Object}
            */
        getData(): any;
        /**
            * Get the tags of the message.
            * @returns {Array<String>}
            */
        getTags(): Array<String>;
        /**
            * @param {Array<String>} tags
            * Set the tags for the message.
            */
        setTags(tags: Array<String>): void;
        /**
            * Get the ordered elements list (data.elements).
            * Returns null when absent (older messages without elements).
            * @returns {AIAssistantElement[] | null}
            */
        getElements(): AIAssistantElement[] | null;
        /**
            * Set the ordered elements list.
            * Called by the factory/deserializer to populate from data.elements.
            * @param {AIAssistantElement[]} elements
            */
        setElements(elements: AIAssistantElement[]): void;
    }

    /**
      * @module AIAssistantElement
      * Represents a single block in the data.elements array of an AIAssistantMessage.
      */
    export class AIAssistantElement {
        constructor(type: string, data: string | object);
        /**
            * Get the element's type string ("text", "card", "graph", etc.)
            * @returns {string}
            */
        getType(): string;
        /**
            * Get the element's raw body data.
            * Shape depends on getType():
            *   "text" → string
            *   "card" → { card: {...}, cardId: "..." }
            *   other  → raw JSON value
            * @returns {string | object}
            */
        getData(): string | object;
    }

    /**
      * @module CardMessage
      */
    export class CardMessage extends BaseMessage implements Message {
        protected data?: any;
        constructor(receiverId: string, receiverType: string, type?: string);
        getCard(): object;
        setCard(card: object): void;
        getFallbackText(): string;
        getText(): string;
        getTags(): Array<String>;
        setTags(tags: Array<String>): void;
        getData(): any;
        getSender(): User;
        getReceiver(): User | Group;
    }

    /**
        *
        * @module AIToolResultMessage
        */
    export class AIToolResultMessageData {
        runId: string;
        threadId: string;
        text: string;
        toolCallId: string;
        constructor(runId: string, threadId: string, text: string, toolCallId: string);
        /**
            * Get the run ID of the tool result message.
            * @returns {string}
            */
        getRunId(): string;
        /**
            * Set the run ID of the tool result message.
            * @param {string} runId
            */
        setRunId(runId: string): void;
        /**
            * Get the thread ID of the tool result message.
            * @returns {string}
            */
        getThreadId(): string;
        /**
            * Set the thread ID of the tool result message.
            * @param {string} threadId
            */
        setThreadId(threadId: string): void;
        /**
            * Get the text of the tool result message.
            * @returns {string}
            */
        getText(): string;
        /**
            * Set the text of the tool result message.
            * @param {string} text
            */
        setText(text: string): void;
        /**
            * Get the tool call ID of the tool result message.
            * @returns {string}
            */
        getToolCallId(): string;
        /**
            * Set the tool call ID of the tool result message.
            * @param {string} toolCallId
            */
        setToolCallId(toolCallId: string): void;
    }
    export class AIToolResultMessage extends BaseMessage implements Message {
        protected data?: any;
        protected toolMessageData?: AIToolResultMessageData;
        constructor(receiverId: string, receiverType: string);
        /**
            * Method to get sender of the message.
            * @returns {User}
            */
        getSender(): User;
        /**
            * Method to get receiver of the message.
            * @returns {User | Group}
            */
        getReceiver(): User | Group;
        /**
            * Method to get data of the message.
            * @returns {AIToolResultMessageData}
            */
        getToolResultMessageData(): AIToolResultMessageData;
        /**
            * Method to set data of the message.
            * @param {AIAssistantMessageData} data
            */
        setToolResultMessageData(data: AIToolResultMessageData): void;
        /**
            * Method to get data of the message.
            * @returns {Object}
            */
        getData(): any;
        /**
            * Get the tags of the message.
            * @returns {Array<String>}
            */
        getTags(): Array<String>;
        /**
            * @param {Array<String>} tags
            * Set the tags for the message.
            */
        setTags(tags: Array<String>): void;
    }

    /**
        *
        * @module AIToolArgumentMessage
        */
    export class AIToolCallFunction {
        name: string;
        arguments: string;
        constructor(name: string, args: string);
        /**
            * Get the name of the function.
            * @returns {string}
            */
        getName(): string;
        /**
            * Set the name of the function.
            * @param {string} name
            */
        setName(name: string): void;
        /**
            * Get the arguments of the function.
            * @returns {string}
            */
        getArguments(): string;
        /**
            * Set the arguments of the function.
            * @param {string} args
            */
        setArguments(args: string): void;
    }
    export class AIToolCall {
        id: string;
        type: string;
        displayName?: string;
        executionText?: string;
        function: AIToolCallFunction;
        constructor(id: string, type: string, functionObj: AIToolCallFunction, displayName?: string, executionText?: string);
        /**
            * Get the id of the tool call.
            * @returns {string}
            */
        getId(): string;
        /**
            * Set the id of the tool call.
            * @param {string} id
            */
        setId(id: string): void;
        /**
            * Get the type of the tool call.
            * @returns {string}
            */
        getType(): string;
        /**
            * Set the type of the tool call.
            * @param {string} type
            */
        setType(type: string): void;
        /**
            * Get the function associated with the tool call.
            * @returns {AIToolCallFunction}
            */
        getFunction(): AIToolCallFunction;
        /**
            * Set the function associated with the tool call.
            * @param {AIToolCallFunction} functionObj
            */
        setFunction(functionObj: AIToolCallFunction): void;
        /**
            * Get the display name of the tool call.
            * @returns {string | undefined}
            */
        getDisplayName(): string | undefined;
        /**
            * Set the display name of the tool call.
            * @param {string} displayName
            */
        setDisplayName(displayName: string): void;
        /**
            * Get the execution text of the tool call.
            * @returns {string | undefined}
            */
        getExecutionText(): string | undefined;
        /**
            * Set the execution text of the tool call.
            * @param {string} executionText
            */
        setExecutionText(executionText: string): void;
        /**
            * Convert the tool call to a JSON object.
            * @returns {Object}
            */
        static fromJSON(json: any): AIToolCall;
        static fromArray(array: Array<any>): Array<AIToolCall>;
    }
    export class AIToolArgumentMessageData {
        runId: string;
        threadId: string;
        toolCalls?: Array<AIToolCall>;
        constructor(runId: string, threadId: string, toolCalls?: Array<AIToolCall>);
        /**
            * Get the run ID of the tool argument message.
            * @returns {string}
            */
        getRunId(): string;
        /**
            * Set the run ID of the tool argument message.
            * @param {string} runId
            */
        setRunId(runId: string): void;
        /**
            * Get the thread ID of the tool argument message.
            * @returns {string}
            */
        getThreadId(): string;
        /**
            * Set the thread ID of the tool argument message.
            * @param {string} threadId
            */
        setThreadId(threadId: string): void;
        /**
            * Get the tool calls associated with the tool argument message.
            * @returns {Array<AIToolCall> | undefined}
            */
        getToolCalls(): Array<AIToolCall> | undefined;
        /**
            * Set the tool calls associated with the tool argument message.
            * @param {Array<AIToolCall>} toolCalls
            */
        setToolCalls(toolCalls: Array<AIToolCall>): void;
    }
    export class AIToolArgumentMessage extends BaseMessage implements Message {
        protected data?: any;
        protected aiToolArgumentMessageData?: AIToolArgumentMessageData;
        constructor(receiverId: string, receiverType: string);
        /**
            * Method to get sender of the message.
            * @returns {User}
            */
        getSender(): User;
        /**
            * Method to get receiver of the message.
            * @returns {User | Group}
            */
        getReceiver(): User | Group;
        /**
            * Method to get data of the message.
            * @returns {AIToolArgumentMessageData}
            */
        getToolArgumentMessageData(): AIToolArgumentMessageData;
        /**
            * Method to set data of the message.
            * @param {AIToolArgumentMessageData} data
            */
        setToolArgumentMessageData(data: AIToolArgumentMessageData): void;
        /**
            * Method to get data of the message.
            * @returns {Object}
            */
        getData(): any;
        /**
            * Get the tags of the message.
            * @returns {Array<String>}
            */
        getTags(): Array<String>;
        /**
            * @param {Array<String>} tags
            * Set the tags for the message.
            */
        setTags(tags: Array<String>): void;
    }

    // ── Multiple-attachment upload (SDK design §5) — stateful request object ──
    interface FileInput {
        uri: string;
        name: string;
        type: string;   // mimeType
        size: number;
    }

    interface UploadResult {
        batchId: string;
        successful: { fileId: string; attachment: Attachment }[];
        rejected:   { fileId: string; error: CometChatException }[];
        failed:     { fileId: string; error: CometChatException }[];
    }

    enum UploadStatus {
        IN_PROGRESS = 'in_progress',
        IDLE = 'idle',
    }

    interface UploadFileCallbacks {
        onFileProgress?: (fileId: string, loaded: number, total: number, percent: number) => void;
        onFileUploaded?: (fileId: string, attachment: Attachment) => void;
        onFileError?:    (fileId: string, error: CometChatException) => void;   // rejected — not retryable
        onFileFailure?:  (fileId: string, error: CometChatException) => void;   // transfer failed — retryable
        onComplete?:     (result: UploadResult) => void;
    }

    class UploadFileListener {
        constructor(callbacks?: UploadFileCallbacks);
        onFileProgress?: (fileId: string, loaded: number, total: number, percent: number) => void;
        onFileUploaded?: (fileId: string, attachment: Attachment) => void;
        onFileError?:    (fileId: string, error: CometChatException) => void;
        onFileFailure?:  (fileId: string, error: CometChatException) => void;
        onComplete?:     (result: UploadResult) => void;
    }

    // One file's current state inside a batch — what a composer rebuilds its tray from
    // after a restart (offline uploads, OU-13). `state` is one of the five public states:
    // QUEUED, UPLOADING, UPLOADED, FAILED, REJECTED (the internal presign step reads as
    // UPLOADING). After a restore it is only ever UPLOADED (done), FAILED (retryable), or
    // REJECTED (not retryable — remove or replace).
    interface UploadFileInfo {
        fileId: string;
        name?: string;
        size?: number;
        mimeType?: string;
        /** "QUEUED" | "UPLOADING" | "UPLOADED" | "FAILED" | "REJECTED" */
        state: string;
        /** Present only when the file is UPLOADED. */
        attachment?: Attachment;
        /** Present when the file is FAILED or REJECTED. */
        error?: CometChatException;
        /**
         * Absolute file:// URI of the SDK's own copy of the bytes — what a composer renders a
         * RESTORED tile's thumbnail from. After a process death the picker URI is revoked and a
         * file that never uploaded has no hosted URL, so this is the only preview source a
         * restored FAILED tile has. undefined when the bytes are unavailable (offline OFF,
         * evicted, or reclaimed after a rejection). Android name: getLocalCopyPath().
         */
        localCopyPath?: string;
        /** @deprecated Use localCopyPath — the same value. */
        localUri?: string;
    }

    // Not constructible directly — obtain an instance via CometChat.createUploadFileRequest().
    // `interface` (not `class`) so the type is usable as a return/annotation but `new
    // CometChat.UploadFileRequest()` is a compile error, matching the runtime (no such static).
    interface UploadFileRequest {
        setParentMessageId(messageId: string | number): UploadFileRequest;
        setBatchId(batchId: string): UploadFileRequest;
        getBatchId(): string;
        setConcurrency(count: number): UploadFileRequest;
        uploadAttachments(files: { fileId: string; file: FileInput }[], listener: UploadFileListener): void;
        uploadAttachment(fileId: string, file: FileInput, listener: UploadFileListener): void;
        /**
         * Retry ONE retryable-failed file BY ID — the SDK streams from its own copy of the
         * bytes, so this works after an app restart with no re-supply of the file. Mints a
         * fresh upload target and re-uploads the whole file (no mid-transfer resume).
         * Requires offline messaging to be enabled.
         */
        retryAttachment(fileId: string, listener?: UploadFileListener): void;
        /** Retry every retryable-failed file in the batch. */
        retryAll(listener?: UploadFileListener): void;
        getAttachment(fileId: string): Attachment | null;
        getAttachments(): Attachment[];
        getAttachmentsByType(type: string): Attachment[];
        getAttachmentCount(): number;
        getStatus(): UploadStatus;
        /**
         * EVERY file in the batch, in the order they were added, with its current state —
         * what a composer rebuilds its tray from after a restart. `getAttachments()` returns
         * only the files that finished uploading, which cannot express retryable tiles.
         */
        getItems(): UploadFileInfo[];
        /** @deprecated Use getItems() — the same list under the Android name. */
        getFiles(): UploadFileInfo[];
        addUploadListener(listener: UploadFileListener): void;
        removeUploadListener(): void;
        removeAttachment(fileId: string): void;
        clearAll(): void;
    }

    function createUploadFileRequest(receiverId: string, receiverType: string): UploadFileRequest;
    /**
     * Read back the EXISTING upload batch for a destination — re-attached, with each file's
     * current state — or null when there is none. The offline restore path: call it on chat
     * open and rebuild the composer's tray from `request.getItems()`.
     *
     * Every parameter is identical to when the batch was created (receiver, thread parent,
     * batch id, concurrency, and each file's id / name / size / mime / state / attachment /
     * failure reason, in insertion order). Listeners are transient — re-register them. The
     * original file handles are gone; retry with `retryAttachment(fileId)`.
     *
     * Nothing uploads as a result of this call. Always resolves null when offline is off.
     */
    function getExistingUploadFileRequest(
        receiverId: string,
        receiverType: string,
        parentMessageId?: string | number
    ): Promise<UploadFileRequest | null>;
    function getMaxAttachmentCount(): Promise<number>;
}

export namespace CometChatNotifications{
    /**
        * Function to get preferences set for the logged-in user.
        * @returns {Promise<PushPreferences>}
        * @memberof CometChatNotifications
        * @deprecated
        *
        * This method is deprecated as of version 4.0.10 due to newer method 'fetchPreferences'. It will be removed in subsequent versions.
     */
    export function fetchPushPreferences(): Promise<PushPreferences>;
    /**
        * Function to get preferences set for the logged-in user.
        * @returns {Promise<NotificationPreferences>}
        * @memberof CometChatNotifications
     */
    export function fetchPreferences(): Promise<NotificationPreferences>;
    /**
        * Function to update preferences for the logged-in user.
        * @param {PushPreferences} pushPreferences
        * @returns {Promise<PushPreferences>}
        * @memberof CometChatNotifications
        * @deprecated
        *
        * This method is deprecated as of version 4.0.10 due to newer method 'updatePreferences'. It will be removed in subsequent versions.
     */
    export function updatePushPreferences(pushPreferences: PushPreferences): Promise<PushPreferences>;
    /**
        * Function to update preferences for the logged-in user.
        * @param {NotificationPreferences} notificationPreferences
        * @returns {Promise<NotificationPreferences>}
        * @memberof CometChatNotifications
     */
    export function updatePreferences(notificationPreferences: NotificationPreferences): Promise<NotificationPreferences>;
    /**
        * Function to reset preferences for the logged-in user.
        * @returns {Promise<PushPreferences>}
        * @memberof CometChatNotifications
        * @deprecated
        *
        * This method is deprecated as of version 4.0.10 due to newer method 'resetPreferences'. It will be removed in subsequent versions.
     */
    export function resetPushPreferences(): Promise<PushPreferences>;
    /**
        * Function to reset preferences for the logged-in user.
        * @returns {Promise<NotificationPreferences>}
        * @memberof CometChatNotifications
     */
    export function resetPreferences(): Promise<NotificationPreferences>;
    /**
        * Function to register push token for the current authToken of the logged-in user.
        * @returns {Promise<string>}
        * @param {string} pushToken
        * @param {PushPlatforms} platform
        * @param {string} providerId - Optional, default value is `default`.
        * @memberof CometChatNotifications
     */
    export function registerPushToken(pushToken: string, platform: PushPlatforms, providerId?: string): Promise<string>;
    /**
        * Function to unregister push token registered for the current authToken of the logged-in user.
        * @returns {Promise<string>}
        * @memberof CometChatNotifications
     */
    export function unregisterPushToken(): Promise<string>;
    /**
        * Function to mute conversations for the logged-in user.
        * @returns {Promise<string>}
        * @param {MutedConversation[]} mutedConversations
        * @memberof CometChatNotifications
     */
    export function muteConversations(mutedConversations: MutedConversation[]): Promise<string>;
    /**
        * Function to unmute conversations for the logged-in user.
        * @returns {Promise<string>}
        * @param {UnmutedConversation[]} unmutedConversations
        * @memberof CometChatNotifications
     */
    export function unmuteConversations(unmutedConversations: UnmutedConversation[]): Promise<string>;
    /**
     * Function to retrieve list of muted conversations for the logged-in user.
     * @returns {Promise<MutedConversation[]>}
     * @memberof CometChatNotifications
    */
    export function getMutedConversations(): Promise<MutedConversation[]>;

   
  /**
   * Function to update timezone for the logged-in user.
   * @returns {Promise<string>}
   * @param {string} timezone
   * @memberof CometChatNotifications
   */
  export function updateTimezone(timezone: String): Promise<string>;
  /**
   * Function to get timezone for the logged-in user.
   * @returns {Promise<{timezone: string} | string>} A promise that resolves to an object containing the timezone or a string in case of an error.
   * @memberof CometChatNotifications
   */
  export function getTimezone(): Promise<
    | {
        timezone: string;
      }
    | string
  >;

    export enum MessagesOptions {
        DONT_SUBSCRIBE,
        SUBSCRIBE_TO_ALL,
        SUBSCRIBE_TO_MENTIONS
    }
    export enum RepliesOptions {
        DONT_SUBSCRIBE,
        SUBSCRIBE_TO_ALL,
        SUBSCRIBE_TO_MENTIONS,
        SUBSCRIBE_TO_SUBSCRIBED_THREADS
    }
    export enum QuotedRepliesOptions {
        DONT_SUBSCRIBE,
        SUBSCRIBE_TO_ALL,
        SUBSCRIBE_TO_MENTIONS,
        SUBSCRIBE_TO_QUOTES_ON_OWN_MESSAGES
    }
    export enum ReactionsOptions {
        DONT_SUBSCRIBE,
        SUBSCRIBE_TO_REACTIONS_ON_OWN_MESSAGES,
        SUBSCRIBE_TO_REACTIONS_ON_ALL_MESSAGES
    }
    export enum MemberActionsOptions {
        DONT_SUBSCRIBE,
        SUBSCRIBE
    }
    export enum DNDOptions {
        DISABLED,
        ENABLED
    }
    export enum DayOfWeek {
        MONDAY = "monday",
        TUESDAY = "tuesday",
        WEDNESDAY = "wednesday",
        THURSDAY = "thursday",
        FRIDAY = "friday",
        SATURDAY = "saturday",
        SUNDAY = "sunday"
    }
    export enum MutedConversationType {
        ONE_ON_ONE = "oneOnOne",
        GROUP = "group"
    }
    export enum PushPlatforms {
        FCM_REACT_NATIVE_ANDROID = "fcm_react_native_android",
        FCM_REACT_NATIVE_IOS = "fcm_react_native_ios",
        APNS_REACT_NATIVE_DEVICE = "apns_react_native_device",
        APNS_REACT_NATIVE_VOIP = "apns_react_native_voip"
    }
    export const APIConstants: {
        KEY_GROUP_PREFERENCES: string;
        KEY_GROUP_MESSAGES: string;
        KEY_GROUP_REACTIONS: string;
        KEY_GROUP_REPLIES: string;
        KEY_GROUP_MEMBER_ADDED: string;
        KEY_GROUP_MEMBER_LEFT: string;
        KEY_GROUP_MEMBER_JOINED: string;
        KEY_GROUP_MEMBER_KICKED: string;
        KEY_GROUP_MEMBER_BANNED: string;
        KEY_GROUP_MEMBER_UNBANNED: string;
        KEY_GROUP_MEMBER_SCOPE_CHANGED: string;
        KEY_MUTE_PREFERENCES: string;
        KEY_MUTE_DND: string;
        KEY_MUTE_SCHEDULE: string;
        KEY_ONE_ON_ONE_PREFERENCES: string;
        KEY_ONE_ON_ONE_MESSAGES: string;
        KEY_ONE_ON_ONE_REACTIONS: string;
        KEY_ONE_ON_ONE_REPLIES: string;
        KEY_USE_PRIVACY_TEMPLATE: string;
        KEY_PROVIDER_ID: string;
        KEY_TIMEZONE: string;
        KEY_PLATFORM: string;
        KEY_FCM_TOKEN: string;
        KEY_CONVERSATIONS: string;
        KEY_GET_PREFERENCES: string;
        KEY_UPDATE_PREFERENCES: string;
        KEY_RESET_PREFERENCES: string;
        KEY_REGISTER_TOKEN: string;
        KEY_UNREGISTER_TOKEN: string;
        KEY_MUTE_CONVERSATIONS: string;
        KEY_UNMUTE_CONVERSATIONS: string;
        KEY_GET_MUTED_CONVERSATIONS: string;
        KEY_MUTED_CONVERSATIONS: string;
        KEY_FROM: string;
        KEY_TO: string;
        KEY_GET_TIMEZONE: string;
        KEY_UPDATE_TIMEZONE: string;
    };
    export const APIResponseConstants: {
        TOKEN_REGISTER_SUCCESS: string;
        TOKEN_REGISTER_ERROR: string;
        TOKEN_UNREGISTER_SUCCESS: string;
        TOKEN_UNREGISTER_ERROR: string;
        MUTE_CONVERSATION_SUCCESS: string;
        MUTE_CONVERSATION_ERROR: string;
        UNMUTE_CONVERSATION_SUCCESS: string;
        UNMUTE_CONVERSATION_ERROR: string;
        TIMEZONE_UPDATE_SUCCESS: string;
        TIMEZONE_UPDATE_ERROR: string;
        TIMEZONE_FETCH_ERROR: string;
    };
    export const DEFAULT_PROVIDER_ID = "default";
    
    export class DaySchedule {
            constructor(from: number, to: number, dnd: boolean);
            /**
                * Get the from value of Day Schedule.
                * @returns {number}
             */
            getFrom(): number;
            /**
                * @param {number} from
                * Set the from value of Day Schedule.
             */
            setFrom(from: number): void;
            /**
                * Get the to value of Day Schedule.
                * @returns {number}
             */
            getTo(): number;
            /**
                * @param {number} to
                * Set the to value of Day Schedule.
             */
            setTo(to: number): void;
            /**
                * Get the value of DND of Day Schedule.
                * @returns {boolean}
             */
            getDND(): boolean;
            /**
                * @param {boolean} dnd
                * Set the value of DND of Day Schedule.
             */
            setDND(dnd: boolean): void;
    }
    
    /**
        *
        * @module GroupPreferences
        */
    export class GroupPreferences {
            /**
                * Get the messages preferences for groups.
                * @returns {MessagesOptions}
             */
            getMessagesPreference(): MessagesOptions;
            /**
                * Get the replies preferences for groups.
                * @returns {RepliesOptions}
             */
            getRepliesPreference(): RepliesOptions;
            /**
                * Get the quoted replies preferences for groups.
                * @returns {QuotedRepliesOptions}
             */
            getQuotedRepliesPreference(): QuotedRepliesOptions;
            /**
                * Get the reactions preferences for groups.
                * @returns {ReactionsOptions}
             */
            getReactionsPreference(): ReactionsOptions;
            /**
                * Get the member left preferences for groups.
                * @returns {MemberActionsOptions}
             */
            getMemberLeftPreference(): MemberActionsOptions;
            /**
                * Get the member added preferences for groups.
                * @returns {MemberActionsOptions}
             */
            getMemberAddedPreference(): MemberActionsOptions;
            /**
                * Get the member joined preferences for groups.
                * @returns {MemberActionsOptions}
             */
            getMemberJoinedPreference(): MemberActionsOptions;
            /**
                * Get the member kicked preferences for groups.
                * @returns {MemberActionsOptions}
             */
            getMemberKickedPreference(): MemberActionsOptions;
            /**
                * Get the member banned preferences for groups.
                * @returns {MemberActionsOptions}
             */
            getMemberBannedPreference(): MemberActionsOptions;
            /**
                * Get the member unbanned preferences for groups.
                * @returns {MemberActionsOptions}
             */
            getMemberUnbannedPreference(): MemberActionsOptions;
            /**
                * Get the member scope change preferences for groups.
                * @returns {MemberActionsOptions}
             */
            getMemberScopeChangedPreference(): MemberActionsOptions;
            /**
             * @param {MessagesOptions} messagesPreference
             * Set messages preference for groups.
             */
            setMessagesPreference(messagesPreference: MessagesOptions): void;
            /**
             * @param {RepliesOptions} repliesPreference
             * Set replies preference for groups.
             */
            setRepliesPreference(repliesPreference: RepliesOptions): void;
            /**
             * @param {QuotedRepliesOptions} quotedRepliesPreference
             * Set quoted replies preference for groups.
             */
            setQuotedRepliesPreference(quotedRepliesPreference: QuotedRepliesOptions): void;
            /**
             * @param {ReactionsOptions} reactionsPreference
             * Set reactions preference for groups.
             */
            setReactionsPreference(reactionsPreference: ReactionsOptions): void;
            /**
             * @param {MemberActionsOptions} memberLeftPreference
             * Set member left preference for groups.
             */
            setMemberLeftPreference(memberLeftPreference: MemberActionsOptions): void;
            /**
             * @param {MemberActionsOptions} memberAddedPreference
             * Set member added preference for groups.
             */
            setMemberAddedPreference(memberAddedPreference: MemberActionsOptions): void;
            /**
             * @param {MemberActionsOptions} memberJoinedPreference
             * Set member joined preference for groups.
             */
            setMemberJoinedPreference(memberJoinedPreference: MemberActionsOptions): void;
            /**
             * @param {MemberActionsOptions} memberKickedPreference
             * Set member kicked preference for groups.
             */
            setMemberKickedPreference(memberKickedPreference: MemberActionsOptions): void;
            /**
             * @param {MemberActionsOptions} memberBannedPreference
             * Set member banned preference for groups.
             */
            setMemberBannedPreference(memberBannedPreference: MemberActionsOptions): void;
            /**
             * @param {MemberActionsOptions} memberUnbannedPreference
             * Set member unbanned preference for groups.
             */
            setMemberUnbannedPreference(memberUnbannedPreference: MemberActionsOptions): void;
            /**
             * @param {MemberActionsOptions} memberScopeChangedPreference
             * Set member scope change preference for groups.
             */
            setMemberScopeChangedPreference(memberScopeChangedPreference: MemberActionsOptions): void;
            /**
                * @param {Object} jsonData
                * Convert JSON object to GroupPreferences.
            */
            static fromJSON(jsonData: Object): GroupPreferences;
    }
    
    export class MutedConversation {
            /**
                * Get the id of muted conversation
                * @returns {string}
                */
            getId(): string;
            /**
                * Set the id of muted conversation
                * @param {string} id
                */
            setId(id: string): void;
            /**
                * Get the conversation type of muted conversation.
                * @returns {ConversationsType}
                */
            getType(): ConversationsType;
            /**
                * Set the conversation type of muted conversation.
                * @param {ConversationsType} type
                */
            setType(type: ConversationsType): void;
            /**
                * Get the date until which the conversation should be muted.
                * @returns {number}
                */
            getUntil(): number;
            /**
                * Set the date until which the conversation should be muted.
                * @param {number} until
                */
            setUntil(until: number): void;
    }
    
    export class MutePreferences {
            /**
                * Get the DND preferences.
                * @returns {DNDOptions}
                */
            getDNDPreference(): DNDOptions;
            /**
                * @param {DNDOptions} dndPreferences
                * Set DND preferences.
                */
            setDNDPreference(dndPreferences: DNDOptions): void;
            /**
                * Get the schedule preferences.
                * @returns {Map<DayOfWeek, DaySchedule>}
                */
            getSchedulePreference(): Map<DayOfWeek, DaySchedule>;
            /**
                * @param {Map<DayOfWeek, DaySchedule>} schedule
                * Set the schedule preferences.
                */
            setSchedulePreference(schedule: Map<DayOfWeek, DaySchedule>): void;
            /**
                * Get the schedule for a day.
                * @returns {DaySchedule}
                */
            getScheduleFor(day: DayOfWeek): DaySchedule;
            /**
                * @param {DayOfWeek} day
                * @param {DaySchedule} schedule
                * Set the schedule for a day.
                */
            setScheduleFor(day: DayOfWeek, schedule: DaySchedule): void;
            /**
                * @param {Object} jsonData
                * Convert JSON object to MutePreferences.
             */
            static fromJSON(jsonData: Object): MutePreferences;
    }
    
    export class OneOnOnePreferences {
            /**
                * Get the reactions preferences for groups.
                * @returns {ReactionsOptions}
             */
            getReactionsPreference(): ReactionsOptions;
            /**
                * @param {ReactionsOptions} reactionsPreference
                * Set reactions preference for groups.
             */
            setReactionsPreference(reactionsPreference: ReactionsOptions): void;
            /**
                * Get the replies preferences for groups.
                * @returns {RepliesOptions}
             */
            getRepliesPreference(): RepliesOptions;
            /**
                * Get the quoted replies preferences for groups.
                * @returns {QuotedRepliesOptions}
             */
            getQuotedRepliesPreference(): QuotedRepliesOptions;
            /**
                * @param {RepliesOptions} repliesPreference
                * Set replies preference for groups.
             */
            setRepliesPreference(repliesPreference: RepliesOptions): void;
            /**
                * @param {QuotedRepliesOptions} quotedRepliesPreference
                * Set quoted replies preference for groups.
             */
            setQuotedRepliesPreference(quotedRepliesPreference: QuotedRepliesOptions): void;
            /**
                * Get the messages preferences for groups.
                * @returns {MessagesOptions}
             */
            getMessagesPreference(): MessagesOptions;
            /**
                * @param {MessagesOptions} messagesPreference
                * Set messages preference for groups.
             */
            setMessagesPreference(messagesPreference: MessagesOptions): void;
            /**
                * @param {Object} jsonData
                * Convert JSON object to OneOnOnePreferences.
             */
            static fromJSON(jsonData: Object): OneOnOnePreferences;
    }
    
    /**
     * @deprecated This class is deprecated as of version 4.0.10 due to newer class 'NotificationPreferences'.
     * It will be removed in subsequent versions.
    */
    export class PushPreferences {
            /**
                * Get the OneOnOne preferences.
                * @returns {OneOnOnePreferences}
             */
            getOneOnOnePreferences(): OneOnOnePreferences;
            /**
                * @param {OneOnOnePreferences} oneOnOnePreferences
                * Set the OneOnOne preferences.
             */
            setOneOnOnePreferences(oneOnOnePreferences: OneOnOnePreferences): void;
            /**
                * Get the Muted preferences.
                * @returns {MutePreferences}
             */
            getMutePreferences(): MutePreferences;
            /**
                * @param {MutePreferences} mutePreferences
                * Set the Mute preferences.
             */
            setMutePreferences(mutePreferences: MutePreferences): void;
            /**
                * Get the Group preferences.
                * @returns {GroupPreferences}
             */
            getGroupPreferences(): GroupPreferences;
            /**
                * @param {GroupPreferences} groupPreferences
                * Set the Group preferences.
             */
            setGroupPreferences(groupPreferences: GroupPreferences): void;
            /**
                * Returns whether to use privacy template or not.
                * @returns {boolean}
             */
            getUsePrivacyTemplate(): boolean;
            /**
                * @param {boolean} usePrivacyTemplate
                * Set whether to use privacy template or not.
             */
            setUsePrivacyTemplate(usePrivacyTemplate: boolean): void;
            /**
                * @param {Object} jsonData
                * Convert JSON object to PushPreferences.
             */
            static fromJSON(jsonData: Object): PushPreferences;
    }

    export class NotificationPreferences {
        /**
            * Get the OneOnOne preferences.
            * @returns {OneOnOnePreferences}
         */
        getOneOnOnePreferences(): OneOnOnePreferences;
        /**
            * @param {OneOnOnePreferences} oneOnOnePreferences
            * Set the OneOnOne preferences.
         */
        setOneOnOnePreferences(oneOnOnePreferences: OneOnOnePreferences): void;
        /**
            * Get the Muted preferences.
            * @returns {MutePreferences}
         */
        getMutePreferences(): MutePreferences;
        /**
            * @param {MutePreferences} mutePreferences
            * Set the Mute preferences.
         */
        setMutePreferences(mutePreferences: MutePreferences): void;
        /**
            * Get the Group preferences.
            * @returns {GroupPreferences}
         */
        getGroupPreferences(): GroupPreferences;
        /**
            * @param {GroupPreferences} groupPreferences
            * Set the Group preferences.
         */
        setGroupPreferences(groupPreferences: GroupPreferences): void;
        /**
            * Returns whether to use privacy template or not.
            * @returns {boolean}
         */
        getUsePrivacyTemplate(): boolean;
        /**
            * @param {boolean} usePrivacyTemplate
            * Set whether to use privacy template or not.
         */
        setUsePrivacyTemplate(usePrivacyTemplate: boolean): void;
        /**
            * @param {Object} jsonData
            * Convert JSON object to NotificationPreferences.
         */
        static fromJSON(jsonData: Object): NotificationPreferences;
    }
    
    export class UnmutedConversation {
            /**
                * Get the id of unmuted conversation
                * @returns {string}
                */
            getId(): string;
            /**
                * Set the id of unmuted conversation
                * @param {string} id
                */
            setId(id: string): void;
            /**
                * Get the conversation type of unmuted conversation.
                * @returns {ConversationsType}
                */
            getType(): ConversationsType;
            /**
                * Set the conversation type of unmuted conversation.
                * @param {ConversationsType} type
                */
            setType(type: ConversationsType): void;
    }
}
export namespace CometChat {
        let AIAssistantBaseEvent: typeof AIAssistantBaseEvent;
        let AIAssistantRunStartedEvent: typeof AIAssistantRunStartedEvent;
        let AIAssistantRunFinishedEvent: typeof AIAssistantRunFinishedEvent;
        let AIAssistantMessageStartedEvent: typeof AIAssistantMessageStartedEvent;
        let AIAssistantMessageEndedEvent: typeof AIAssistantMessageEndedEvent;
        let AIAssistantContentReceivedEvent: typeof AIAssistantContentReceivedEvent;
        let AIAssistantToolStartedEvent: typeof AIAssistantToolStartedEvent;
        let AIAssistantToolEndedEvent: typeof AIAssistantToolEndedEvent;
        let AIAssistantToolArgumentEvent: typeof AIAssistantToolArgumentEvent;
        let AIAssistantToolResultEvent: typeof AIAssistantToolResultEvent;
        let AIAssistantCardStartedEvent: typeof AIAssistantCardStartedEvent;
        let AIAssistantCardReceivedEvent: typeof AIAssistantCardReceivedEvent;
        let AIAssistantCardEndedEvent: typeof AIAssistantCardEndedEvent;
        let AI_ASSISTANT_EVENTS: {
                RUN_STARTED: string;
                RUN_FINISHED: string;
                TEXT_MESSAGE_START: string;
                TEXT_MESSAGE_END: string;
                TEXT_MESSAGE_CONTENT: string;
                TOOL_CALL_STARTED: string;
                TOOL_CALL_ENDED: string;
                TOOL_CALL_RESULT: string;
                TOOL_CALL_ARGUMENT: string;
                CARD_START: string;
                CARD: string;
                CARD_END: string;
        };
        let AIAssistantMessage: typeof AIAssistantMessage;
        let AIAssistantElement: typeof AIAssistantElement;
        let CardMessage: typeof CardMessage;
        let AIToolCall: typeof AIToolCall;
        let AIToolCallFunction: typeof AIToolCallFunction;
        let AIAssistantMessageData: typeof AIAssistantMessageData;
        let AIToolResultMessage: typeof AIToolResultMessage;
        let AIToolResultMessageData: typeof AIToolResultMessageData;
        let AIToolArgumentMessage: typeof AIToolArgumentMessage;
        let AIToolArgumentMessageData: typeof AIToolArgumentMessageData;
        let AIAssistantListener: typeof AIAssistantListener;
        let USER_STATUS: {
                ONLINE: string;
                OFFLINE: string;
        };
        let MESSAGE_TYPE: {
                TEXT: string;
                MEDIA: string;
                IMAGE: string;
                VIDEO: string;
                AUDIO: string;
                FILE: string;
                CUSTOM: string;
                ASSISTANT: string;
                TOOL_RESULT: string;
                TOOL_ARGUMENTS: string;
        };
        let CATEGORY_MESSAGE: string;
        let CATEGORY_ACTION: string;
        let CATEGORY_CALL: string;
        let CATEGORY_CUSTOM: string;
        let CATEGORY_INTERACTIVE: string;
        let CATEGORY_CARD: string;
        let CATEGORY_AGENTIC: string;
        let ACTION_TYPE: {
                MEMBER_ADDED: string;
                MEMBER_JOINED: string;
                MEMBER_LEFT: string;
                MEMBER_KICKED: string;
                MEMBER_BANNED: string;
                MEMBER_UNBANNED: string;
                MEMBER_INVITED: string;
                MEMBER_SCOPE_CHANGED: string;
                MESSAGE_EDITED: string;
                MESSSAGE_DELETED: string;
                TYPE_USER: string;
                TYPE_GROUP: string;
                TYPE_GROUP_MEMBER: string;
        };
        let CALL_MODE: {
            DEFAULT: string,
            SPOTLIGHT: string,
            SINGLE: string,
        };
        let AUDIO_MODE: {
            SPEAKER: string,
            EARPIECE: string,
            BLUETOOTH: string,
            HEADPHONES: string
        };
        let CALL_TYPE: {
                AUDIO: string;
                VIDEO: string;
        };
        let RECEIVER_TYPE: {
                USER: string;
                GROUP: string;
        };
        let CALL_STATUS: {
                INITIATED: string;
                ONGOING: string;
                UNANSWERED: string;
                REJECTED: string;
                BUSY: string;
                CANCELLED: string;
                ENDED: string;
        };
        let SORT_BY: {
            NAME: string;
            STATUS: string;
        }
        let SORT_ORDER: {
            ASCENDING: string;
            DESCENDING: string;
        }
        
        let appSettings: AppSettings;
        
        /**
            * Getter for appId.
            * @internal
            * @returns
            * @memberof CometChat
        */
        export function getAppId(): string;
        
        /**
            * Getter for apiKey.
            * @internal
            * @returns
            * @memberof CometChat
        */
        export function getApiKey(): string;
        
        /**------------------------------------*
        * Core apis     					   *
        *-------------------------------------**/
        
        /**
            * Initialize the CometChat app with appId & Object of AppSettings Class.
            * @param {string} appId
            * @param {AppSettings} appSettings
            * @returns {CometChat}
            * @memberof CometChat
        */
        export function init(appId: any, appSettings: AppSettings): Promise<boolean>;
        
        /**
            * Initialize CometChat from a cometchat-settings.json object.
            * Used for file-based integration via AI agent skills.
            * @param {CometChatSettings} settings
            * @returns {Promise<boolean>}
            * @memberof CometChat
        */
        export function initFromSettings(settings: CometChatSettings): Promise<boolean>;
        
        /**
            * Function to check whether CometChat class initialized before.
            * @returns {boolean}
            * @memberof CometChat
        */
        export function isInitialized(): boolean;
        
        /**
            * Function to register the FCM token for Push Notification.
            * @param {string} token
            * @param {JSON Object} Settings
            * @returns {Promise<string>}
            * @memberof CometChat
        */
        export function registerTokenForPushNotification(token: string, settings?: {}): Promise<string>;
        
        /**
            * Login funtion will authenticate user provided as an argument. There are two ways to login:
            * 1. using UID and authKey (unsecure way)
            * 2. using authToken (secure way)
            * @param {...string[]} args
            * @returns {User | CometChatException}
            * @memberof CometChat
        */
        export function login(...args: any): Promise<User>;
        
        /**-------------------------------------------------------------------*
        *    Message related functions provided by CometChat class            *
        *--------------------------------------------------------------------**/
        
        /**
            * Function to send message.
            * @param {TextMessage | MediaMessage | CustomMessage | InteractiveMessage |any} message
            * @returns {Message | any}
            * @memberof CometChat
        */
        export function sendMessage(message: TextMessage | MediaMessage | CustomMessage | InteractiveMessage |any): Promise<TextMessage | MediaMessage | CustomMessage | InteractiveMessage | BaseMessage>;
        /**
            * Offline: additive 3-phase send — onMessagePending (queued locally, status PENDING, local id set; fires only when offline is enabled) → onMessageSent (server ack) or onError (failure, `reason` set). Passing a listener STILL returns the Promise (it resolves/rejects off the server phase); consume the final result from one channel. Sent while offline, the message stays durably PENDING: the listener gets onMessagePending, then ONE onError with the not-connected code and `reason == null` (the Promise rejects with it), and onMessageSent follows on reconnect (see MessageSentListener).
        */
        export function sendMessage(message: TextMessage | MediaMessage | CustomMessage | InteractiveMessage | any, listener?: MessageSentListener): Promise<TextMessage | MediaMessage | CustomMessage | InteractiveMessage | BaseMessage>;
        
        /**
            * Function to send a message to user.
            * @internal
            * @param {*} message Object
            * @returns
            * @memberof CometChat
        */
        export function sendDirectMessage(message: Object): Promise<TextMessage | BaseMessage | MediaMessage | CustomMessage>;
        
        /**
            * Function to send a message to group.
            * @internal
            * @param {*} message
            * @returns
            * @memberof CometChat
        */
        export function sendGroupMessage(message: any): Promise<TextMessage | BaseMessage | MediaMessage | CustomMessage>;
        
        /**
            * Function to send a media message.
            * @param {MediaMessage} message
            * @returns {Message | any}
            * @memberof CometChat
        */
        export function sendMediaMessage(message: Object): Promise<TextMessage | BaseMessage | MediaMessage | CustomMessage>;
        export function sendMediaMessage(message: Object, listener?: MessageSentListener): Promise<TextMessage | BaseMessage | MediaMessage | CustomMessage>;
        
        /**
            * Function to send a custom message.
            * @param {CustomMessage} message
            * @returns {Message | any}
            * @memberof CometChat
        */
        export function sendCustomMessage(message: CustomMessage): Promise<TextMessage | BaseMessage | MediaMessage | CustomMessage>;
        export function sendCustomMessage(message: CustomMessage, listener?: MessageSentListener): Promise<TextMessage | BaseMessage | MediaMessage | CustomMessage>;
         
        /**
            *
            * Function to send a interactive message.
            * @param {InteractiveMessage} message
            * @returns {Message | any}
            * @memberof CometChat
         */
        export function sendInteractiveMessage(message: InteractiveMessage): Promise<TextMessage | BaseMessage | MediaMessage | CustomMessage>;
        export function sendInteractiveMessage(message: InteractiveMessage, listener?: MessageSentListener): Promise<TextMessage | BaseMessage | MediaMessage | CustomMessage>;
        
        /**
            * Function to get the last delivered message id from local storage.
            * @returns {any}
            * @memberof CometChat
        */
        export function getLastDeliveredMessageId(): Promise<any>;
        
        /**
            * Function to send start typing notification to the provided uid/ guid.
            * @param {TypingIndicator | any} typingNotification
            * @memberof CometChat
        */
        export function startTyping(typingNotification: TypingIndicator | any): void;
        
        /**
            * Function to send stop typing notification to the provided uid/ guid.
            * @param {TypingIndicator | any} typingNotification
            * @memberof CometChat
        */
        export function endTyping(typingNotification: TypingIndicator | any): void;
        
        /**
            * Mark all messages upto a specified message id as read. There are two ways markAsRead works:
            * 1. message
            * 2. messageID, receiverID, receiverType, senderID
            * @param {...string[]} args
            * @memberof CometChat
        */
        export function markAsRead(...args: any): any;
        
        /**
            * Mark all messages upto a specified message id as delivered. There are two ways markAsDelivered works:
            * 1. message
            * 2. messageID, receiverID, receiverType, senderID
            * @param {...string[]} args
            * @memberof CometChat
        */
        export function markAsDelivered(...args: any): any;

        /**
         * Mark entire conversation as read for a user or group.
         * @param {string} conversationWith - User ID or Group ID
         * @param {string} conversationType - Conversation type (user or group)
         * @returns {Promise<string>}
         * @memberof CometChat
        */
        export function markConversationAsRead(conversationWith: string, conversationType: string): Promise<string>;

        /**
         * Mark entire conversation as delivered for a user or group.
         * @param {string} conversationWith - User ID or Group ID
         * @param {string} conversationType - Receiver type (user or group)
         * @returns {Promise<string>}
         * @memberof CometChat
        */
        export function markConversationAsDelivered(conversationWith: string, conversationType: string): Promise<string>;

        /**
            * @deprecated Please use markMessageAsUnread() instead.
            * Mark all the messages after the specified message id as unread.
            * @param {TextMessage | MediaMessage | CustomMessage | BaseMessage | any} message
            * @returns {Promise<string>}
            * @memberof CometChat
         **/
        export function markAsUnread(message: TextMessage | MediaMessage | CustomMessage | any): Promise<string | CometChatException>;
        
        /**
            * Mark all the messages after the specified message id as unread.
            * @param {TextMessage | MediaMessage | CustomMessage | BaseMessage | any} message
            * @returns {Promise<string>}
            * @memberof CometChat
        */
        export function markMessageAsUnread(message: TextMessage | MediaMessage | CustomMessage | any): Promise<Conversation>;
        /**
            * Send a transient message.
            * @param {string} uid
            * @param {string} receiverType
            * @memberof CometChat
        */
        export function sendTransientMessage(transientMessage: TransientMessage): void;
        
        /**
            * Function to fetch message details for the provided messageID.
            * @param {string | any} messageId
            * @returns {Message | any}
            * @memberof CometChat
        */
        export function getMessageDetails(messageId: string | any): Promise<TextMessage | MediaMessage | CustomMessage | InteractiveMessage |BaseMessage>;
        /** Offline: two-phase — cache phase then server phase. See {@link MessageDetailsListener}. */
        export function getMessageDetails(messageId: string | any, listener: MessageDetailsListener): Promise<TextMessage | MediaMessage | CustomMessage | InteractiveMessage |BaseMessage>;
        


        /**
            * A thread is the root message decorated with extra keys. Identity is
            * `parentMessageId` — the root message id; there is no thread resource id.
        */
        export class MessageThread {
            getParentMessageId(): number;
            setParentMessageId(parentMessageId: number): void;
            getParentMessage(): BaseMessage;
            setParentMessage(parentMessage: BaseMessage): void;
            getReplyCount(): number;
            setReplyCount(replyCount: number): void;
            /** Null on a zero-reply thread. */
            getLastReply(): BaseMessage;
            setLastReply(lastReply: BaseMessage): void;
            /** Unix seconds, and the pagination cursor. Opaque — do not sort a UI on it. */
            getUpdatedAt(): number;
            setUpdatedAt(updatedAt: number): void;
            getConversationId(): string;
            setConversationId(conversationId: string): void;
            /** "user" | "group", parsed as an open string. */
            getReceiverType(): string;
            setReceiverType(receiverType: string): void;
            /** The raw uid/guid — no name, no avatar. Hydrate lazily, never drop the row. */
            getReceiverId(): string;
            setReceiverId(receiverId: string): void;
            /**
             * On a `setParticipatedByMe(true)` list (the default) every row reads true: presence in the list is the
             * subscription. On a `setParticipatedByMe(false)` list the server does not send the follow state, so every
             * row reads false.
             */
            isSubscribed(): boolean;
            setSubscribed(subscribed: boolean): void;
            /** Null means unknown, NOT zero. */
            getUnreadReplyCount(): number;
            setUnreadReplyCount(unreadReplyCount: number): void;
            getRawData(): Object;
            setRawData(rawData: Object): void;
        }

        /**
            * The paginated list of threads the logged-in user participates in.
            *
            * Single-use and one-directional: it accumulates its cursor, seen-ids and
            * exhausted flag internally and has no reset(). To refresh, build a NEW
            * request from the same builder and replace the list.
            *
            * Every row is a thread the user is subscribed to — unfollowing
            * hard-deletes the row server-side, so a consumer must remove it locally.
        */
        export class ThreadsRequest {
            constructor(builder?: ThreadsRequestBuilder);
            getLimit(): number;
            isParticipatedByMe(): boolean;
            getGuid(): string;
            getUid(): string;
            /** True while the server may still have rows. */
            hasMore(): boolean;
            /**
                * Resolves [] once exhausted; never resolves [] while hasMore() is true.
                * Offline: with a listener, a two-phase read — onCachedThreads (my threads from the
                * local store, or the recorded all-threads snapshot; may be empty) then onServerThreads
                * (the page the Promise resolves with). Without a listener, behaviour is unchanged.
            */
            fetchNext(listener?: ThreadFetchListener): Promise<MessageThread[]>;
        }

        export class ThreadsRequestBuilder {
            /** 1…1000, default 30 — a thread row carries two fully hydrated messages. */
            setLimit(limit: number): this;
            /** Always sent on the wire, even when true. Default true. */
            setParticipatedByMe(participatedByMe: boolean): this;
            /** Threads in one group. Mutually exclusive with setUid(). */
            setGuid(guid: string): this;
            /** Threads in one 1-1 conversation. Mutually exclusive with setGuid(). */
            setUid(uid: string): this;
            build(): ThreadsRequest;
        }

        /**
            * Function to subscribe the logged-in user to a message thread. Allowed on
            * a message with zero replies.
            * @param {number} parentMessageId
            * @returns {Promise<string>} the server's acknowledgement message
            * @memberof CometChat
        */
        export function subscribeToThread(parentMessageId: number): Promise<string>;

        /**
            * Function to unsubscribe the logged-in user from a message thread.
            * The server row is hard-deleted, so a consumer holding a thread list must
            * remove that row. Not sticky: replying or being mentioned re-subscribes.
            * @param {number} parentMessageId
            * @returns {Promise<string>} the server's acknowledgement message
            * @memberof CometChat
        */
        export function unsubscribeFromThread(parentMessageId: number): Promise<string>;

        /**
            * Function to fetch message receipt details for the provided messageID.
            * @param {string | any} messageId
            * @returns {MessageReceipt[]}
            * @memberof CometChat
        */
        export function getMessageReceipts(messageId: string | any): Promise<MessageReceipt[]>;
        
        /**
            * Function to fetch unread message count.
            * @param {boolean} doHideMessages
            * @returns {Object}
            * @memberof CometChat
        */
        export function getUnreadMessageCount(doHideMessages?: boolean): Promise<Object>;
        
        /**
            * Function to fetch unread message count for all users.
            * @param {boolean} doHideMessages
            * @returns {Object}
            * @memberof CometChat
        */
        export function getUnreadMessageCountForAllUsers(doHideMessages?: boolean): Promise<Object>;
        
        /**
            * Function to fetch unread message count for all groups.
            * @param {boolean} doHideMessages
            * @returns {Object}
            * @memberof CometChat
        */
        export function getUnreadMessageCountForAllGroups(doHideMessages?: boolean): Promise<Object>;
        
        /**
            * Function to fetch unread message count for a particular UID.
            * @param {string} UID
            * @param {boolean} doHideMessages
            * @returns {Object}
            * @memberof CometChat
        */
        export function getUnreadMessageCountForUser(UID: string, doHideMessages?: boolean): Promise<Object>;
        
        /**
            * Function to fetch unread message count for a particular GUID.
            * @param {string} GUID
            * @param {boolean} doHideMessages
            * @returns {Object}
            * @memberof CometChat
        */
        export function getUnreadMessageCountForGroup(GUID: string, doHideMessages?: boolean): Promise<Object>;
        
        /**
            * Function to add reaction for the provided messageID.
            * @param {string | any} messageId
            * @param {string} reaction
            * @returns {Promise<Object>}
            * @memberof CometChat
         */
        export function addReaction(messageId: string | any, reaction: string): Promise<BaseMessage>;
        
        /**
            * Function to remove reaction for the provided messageID.
            * @param {string | any} messageId
            * @param {string} reaction
            * @returns {Promise<Object>}
            * @memberof CometChat
         */
        export function removeReaction(messageId: string | any, reaction: string): Promise<BaseMessage>;

        /**
            * Function to pin a message to its conversation.
            *
            * Conversation-wide and visible to everyone; only an Admin, Moderator or
            * Owner may pin, and the server is the authority on that. Rejects with
            * `ERR_ACTION_NOT_ALLOWED` when the caller lacks the scope, and on a cap
            * breach the rejection carries the server-owned ceiling in
            * `errorParams.limit`.
            * @param {string | any} messageId
            * @returns {Promise<BaseMessage>} the full updated message
            * @memberof CometChat
         */
        export function pinMessage(messageId: string | any): Promise<BaseMessage>;

        /**
            * Function to unpin a message from its conversation.
            *
            * Any Admin/Moderator/Owner may unpin, not just whoever pinned it. The
            * resolved message comes back with the pin attrs cleared.
            * @param {string | any} messageId
            * @returns {Promise<BaseMessage>} the full updated message
            * @memberof CometChat
         */
        export function unpinMessage(messageId: string | any): Promise<BaseMessage>;

        /**
            * Function to save a message for the logged-in user.
            *
            * Private and cross-conversation — no role gate, and nobody else can see
            * it. On a cap breach the rejection carries `errorParams.limit`.
            * @param {string | any} messageId
            * @returns {Promise<BaseMessage>} the full updated message
            * @memberof CometChat
         */
        export function saveMessage(messageId: string | any): Promise<BaseMessage>;

        /**
            * Function to unsave a message for the logged-in user.
            * The resolved message comes back with `savedAt` cleared.
            * @param {string | any} messageId
            * @returns {Promise<BaseMessage>} the full updated message
            * @memberof CometChat
         */
        export function unsaveMessage(messageId: string | any): Promise<BaseMessage>;

        /**
            * Returns whether Pin Message is enabled for the current plan.
            * @returns {Promise<boolean>}
            * @memberof CometChat
         */
        export function isPinMessageEnabled(): Promise<boolean>;

        /**
            * Pins a conversation to the TOP of the conversation list.
            *
            * A different feature from pinMessage: that pins a message inside a chat,
            * this pins the whole chat. Per-user, except admin/global pins
            * (`pinnedBy: app_system`) which everyone sees and no user may unpin.
            *
            * Cap is 5 per user, NOT 100. A never-messaged or hidden conversation
            * cannot be newly pinned — ERR_CONVERSATION_NOT_ACCESSIBLE.
            *
            * ⚠️ Requires `features.ux.conversations.pinned.enabled`, which is NOT
            * seeded in any plan and must be mapped per app. Until then this rejects
            * with ERR_FEATURE_NOT_ACCESSIBLE.
            * @param {string} conversationWith uid or guid
            * @param {string} conversationType "user" | "group"
            * @memberof CometChat
         */
        export function pinConversation(conversationWith: string, conversationType: string): Promise<Conversation>;

        /**
            * Unpins a conversation, returning it to its recency position.
            * A user cannot unpin an admin/global pin.
            * @memberof CometChat
         */
        export function unpinConversation(conversationWith: string, conversationType: string): Promise<Conversation>;

        /**
            * Whether Pin Conversation is enabled for this app. Unlike the two message
            * flags this one is not seeded anywhere and is off by default.
         */
        export function isPinConversationEnabled(): Promise<boolean>;

        /**
            * Returns whether Save Message is enabled for the current plan.
            * @returns {Promise<boolean>}
            * @memberof CometChat
         */
        export function isSaveMessageEnabled(): Promise<boolean>;

        /**
            * Max pinned messages a user may hold in one conversation, or null if the
            * app settings carry no quota.
            * @returns {Promise<number | null>}
            * @memberof CometChat
         */
        export function getPinMessageLimit(): Promise<number | null>;

        /**
            * Max admin/global pinned messages in one conversation. A separate budget
            * from getPinMessageLimit() — system pins do not consume a user's allowance.
            * @returns {Promise<number | null>}
            * @memberof CometChat
         */
        export function getSystemPinMessageLimit(): Promise<number | null>;

        /**
            * Max saved messages for the logged-in user.
            * @returns {Promise<number | null>}
            * @memberof CometChat
         */
        export function getSaveMessageLimit(): Promise<number | null>;

        /**
            * Max conversations a user may pin.
            * @returns {Promise<number | null>}
            * @memberof CometChat
         */
        export function getPinConversationLimit(): Promise<number | null>;

        /**
            * Max admin/global pinned conversations. Separate budget from
            * getPinConversationLimit(), same as the message-level split.
            * @returns {Promise<number | null>}
            * @memberof CometChat
         */
        export function getSystemPinConversationLimit(): Promise<number | null>;

        /**
            * Funtion to edit a message.
            * @param {BaseMessage} message
            * @returns {Promise<BaseMessage>}
            * @memberof CometChat
        */
        export function editMessage(message: BaseMessage): Promise<BaseMessage>;
        
        /**
            * Funtion to delete a message.
            * @param {string} messageId
            * @returns {Promise<BaseMessage>}
            * @memberof CometChat
        */
        export function deleteMessage(messageId: string): Promise<BaseMessage>;
        
        /**---------------------------------------------------------------------------------------*
        * Online User/Group Member count related functions provided by CometChat class           *
        *----------------------------------------------------------------------------------------**/
        
        /**
            * This function will return online user count.
            * @returns {Promise<number>}
            * @memberof CometChat
        */
        export function getOnlineUserCount(): Promise<number>;
        
        /**
            * This function will return online group members count for given GUIDs.
            * @param {String[]} groups
            * @returns {Promise<number>}
            * @memberof CometChat
        */
        export function getOnlineGroupMemberCount(groups: String[]): Promise<Object>;
        
        /**-------------------------------------------------------------------*
        * User related functions provided by CometChat class                  *
        *--------------------------------------------------------------------**/
        
        /**
            * Function to create a user.
            * @param {User | any} user
            * @param {string} apiKey
            * @returns {Promise<User>}
            * @memberof CometChat
        */
        export function createUser(user: User | any, apiKey: string): Promise<User>;
        
        /**
            *
            * Function to update the already existing user and returns the result with updated user.
            * @param {User | any} user
            * @param {string} apiKey
            * @returns {Promise<User>}
            * @memberof CometChat
        */
        export function updateUser(user: User | any, apiKey: string): Promise<User>;
        
        /**
            *
            * Function to update the logged-in user and returns the result with updated user
            * @param {User} user
            * @returns Promise<User>
            * @memberof CometChat
        */
        export function updateCurrentUserDetails(user: User | any): Promise<User>;
        
        /**
            * Function to get the information for the uid provided as an argument
            * @param {string} uid
            * @returns {Promise<User>}
            * @memberof CometChat
        */
        export function getUser(uid: any): Promise<User>;
        
        /**
            *
            * This function will return logged in user from local storage.
            * @returns {Promise<User | null>}
            * @memberof CometChat
        */
        export function getLoggedinUser(): Promise<User | null>;
        
        /**
            * Function to block users.
            * @param {String[]} blockedUids
            * @returns
            * @memberof CometChat
        */
        export function blockUsers(blockedUids: String[]): Promise<Object>;
        
        /**
            * Function to unblock users.
            * @param {String[]} blockedUids
            * @returns
            * @memberof CometChat
        */
        export function unblockUsers(blockedUids: String[]): Promise<Object>;
        
        /**-------------------------------------------------------------------*
        * Conversation related functions provided by CometChat class         *
        *--------------------------------------------------------------------**/
        
        /**
            * Function to fetch conversation for a specific user/group.
            * @param {string} conversationWith
            * @param {string} conversationType
            * @returns {Promise<Conversation>}
            * @memberof CometChat
        */
        export function getConversation(conversationWith: string, conversationType: string): Promise<Conversation>;
        /** Offline: two-phase — cache phase then server phase. See {@link ConversationDetailsListener}. */
        export function getConversation(conversationWith: string, conversationType: string, listener: ConversationDetailsListener): Promise<Conversation>;

        /**
         * Function to tag a conversation for a specific user/group.
         * @param {string} conversationWith
         * @param {string} conversationType
         * @param {Array<String>} tags
         * @returns {Promise<Conversation>}
         * @memberof CometChat
        */
        export function tagConversation(conversationWith: string, conversationType: string, tags: Array<String>): Promise<Conversation>;
        
        /**
            * function to delete conversation for a specific user/group.
            * @param {string} conversationWith
            * @param {string} conversationType
            * @returns Promise<string>
            * @memberof CometChat
        */
        export function deleteConversation(conversationWith: string, conversationType: string): Promise<string>;
        
        /**-------------------------------------------------------------------*
        * Group related functions provided by CometChat class                *
        *--------------------------------------------------------------------**/
        
        /**
            * Function to create a group.
            * @param {Group} group
            * @returns {Promise<Group>}
            * @memberof CometChat
        */
        export function createGroup(group: Group | any): Promise<Group>;
        
        /**
            * Function to fetch details of a group.
            * @param {string | Object} guid
            * @returns {Promise<Group>}
            * @memberof CometChat
        */
        export function getGroup(guid: string | Object): Promise<Group>;
        
        /**
            * Function to join a public group.
            * @param {guid} guid
            * @param {GroupType} type
            * @param {string} password
            * @returns {Promise<Group>}
            * @memberof CometChat
        */
        export function joinGroup(grp: any, type?: GroupType, password?: string): Promise<Group>;
        
        /**
            * Function to update a group.
            * @param {Group} group
            * @returns {Promise<Group>}
            * @memberof CometChat
        */
        export function updateGroup(group: any): Promise<Group>;
        
        /**
            * Function to delete a group.
            * @param {string} guid
            * @returns {Promise<boolean>}
            * @memberof CometChat
        */
        export function deleteGroup(guid: string): Promise<boolean>;
        
        /**
            * Function to leave a group.
            * @param {string} guid
            * @returns {Promise}
            * @memberof CometChat
        */
        export function leaveGroup(guid: string): Promise<boolean>;
        
        /**
            * Function to kick a member from a group.
            * @param {string} guid
            * @param {string} uid
            * @returns {Promise<boolean>}
            * @memberof CometChat
        */
        export function kickGroupMember(guid: string, uid: string): Promise<boolean>;
        
        /**
            * Function to change the scope of a member in a group.
            * @param {string} guid
            * @param {string} uid
            * @param {GroupMemberScope} scope
            * @returns {Promise<boolean>}
            * @memberof CometChat
        */
        export function updateGroupMemberScope(guid: string, uid: string, scope: GroupMemberScope): Promise<boolean>;
        
        /**
            * Function to ban a group member from a group.
            * @param {string} guid
            * @param {string} uid
            * @returns {Promise<boolean>}
            * @memberof CometChat
        */
        export function banGroupMember(guid: string, uid: string): Promise<boolean>;
        
        /**
            * Function to unban a group member from a group.
            * @param {string} guid
            * @param {string} uid
            * @returns {Promise<boolean>}
            * @memberof CometChat
        */
        export function unbanGroupMember(guid: string, uid: string): Promise<boolean>;
        
        /**
            * Function to add members in a group. This function can also be used to ban a group member from a group.
            * @param {string} guid
            * @param {Array<GroupMember>} groupMembers
            * @param {Array<String>} bannedMembersList
            * @returns {Promise<Object>}
            * @memberof CometChat
        */
        export function addMembersToGroup(guid: string, groupMembers: Array<GroupMember>, bannedMembersList: Array<string>): Promise<Object>;
        
        /**
            *
            * Function to transfer ownership of a group.
            * @param {string} guid
            * @param {string} uid
            * @returns {Promise<string>}
            * @memberof CometChat
        */
        export function transferGroupOwnership(guid: string, uid: string): Promise<string>;

        /**
         * Function to create a group and add/ban members in/from that group.
         * @param {Group} group
         * @param {Array<GroupMember>} members
         * @param {Array<String>} banMembers
         * @returns {Promise<Object>}
         * @memberof CometChat
        */
        export function createGroupWithMembers(group: Group, members: Array<GroupMember>, banMembers: Array<string>): Promise<Object>;
        
        /**-------------------------------------------------------------------*
        * Call related functions provided by CometChat class                 *
        *--------------------------------------------------------------------**/
        
        /**
            * Function to initiate a user/group call.
            * @param {Call} call
            * @returns {Promise<Call>}
            * @memberof CometChat
        */
        export function initiateCall(call: Call | any, timeout?: number): Promise<Call>;
        
        /**
            * Function to accept an incoming user/group call.
            * @param {string} sessionid
            * @returns {Promise<Call>}
            * @memberof CometChat
        */
        export function acceptCall(sessionid: string): Promise<Call>;
        
        /**
            * Function to reject an incoming call or cancel an outgoing call.
            * @param {string} sessionId
            * @param {string} status
            * @returns {Promise<Call>}
            * @memberof CometChat
        */
        export function rejectCall(sessionId: string, status: any): Promise<Call>;
        
        /**
            * Function to end an ongoing call.
            * @param {string} sessionid
            * @param {boolean} isInternal - Optional
            * @returns {Promise<Call>}
            * @memberof CometChat
        */
        export function endCall(sessionid: string, isInternal?: boolean): Promise<Call>;
        
        /**
            * Function to get the active call.
            * @returns {Call}
            * @memberof CometChat
        */
        export function getActiveCall(): Call;

        /**
            * Function to clear any active call.
            * @returns {void}
            * @memberof CometChat
        */
        export function clearActiveCall(): void
        /**
         * Function to start a call.
         * @param {CallSettings} callSettings
         * @memberof CometChat
        */
        export function startCall(callSettings: CallSettings): void;

        /**
            * Function to fetch participant count of an ongoing call.
            * @param {string} sessionId
            * @param {string} type
            * @returns {Promise<number>}
            * @memberof CometChat
        */
        export function getCallParticipantCount(sessionId: string, type: string): Promise<number>;
        
        /**-------------------------------------------------------------------------------------------------------*
        * Events listeners setting and removing	.																  *
        *--------------------------------------------------------------------------------------------------------**/
        
        /**
            * Function to add a Connection Listner.
            * @param {string} name
            * @param {ConnectionListener} connectionListener
            * @memberof CometChat
        */
        export function addConnectionListener(name: string, connectionListener: ConnectionListener): void;
        
        /**
            * Function to remove a Connection Listner.
            * @param {string} name
            * @memberof CometChat
        */
        export function removeConnectionListener(name: string): void;
        
        /**
            * Function to add a Message Listner.
            * @param {string} name
            * @param {MessageListener} messageListener
            * @memberof CometChat
        */
        export function addMessageListener(name: string, messageListener: MessageListener): void;
        
        /**
            * Function to remove a Message Listner.
            * @param {string} name
            * @memberof CometChat
        */
        export function removeMessageListener(name: string): void;
        
        /**
            *
            * Function to add a Call Listener.
            * @param {string} name
            * @param {CallListener} callListener
            * @memberof CometChat
        */
        export function addCallListener(name: string, callListener: CallListener): void;
        
        /**
            * Function to remove a Call Listener.
            * @param {string} name
            * @memberof CometChat
        */
        export function removeCallListener(name: string): void;

         /**
            *
            * Function to add an AI Assistant Listener.
            * @param {string} name
            * @param {AIAssistantListener} aiAssistantListener
            * @memberof CometChat
         */
        export function addAIAssistantListener(name: string, aiAssistantListener: AIAssistantListener): void;
        /**
            *
            * Function to remove an AI Assistant Listener.
            * @param {string} name
            * @memberof CometChat
         */
        export function removeAIAssistantListener(name: string): void;

        /**
            * Function to add a User Listener.
            * @param {string} name
            * @param {UserListener} userListener
            * @memberof CometChat
        */
        export function addUserListener(name: string, userListener: UserListener): void;
        
        /**
            * Function to remove a User Listener.
            * @param {string} name
            * @memberof CometChat
        */
        export function removeUserListener(name: string): void;
        
        /**
            * Function to add a Group Listener.
            * @param {string} name
            * @param {GroupListener} groupListener
            * @memberof CometChat
        */
        export function addGroupListener(name: string, groupListener: GroupListener): void;
        
        /**
            *
            * Function to remove a Group Listener.
            * @param {string} name
            * @memberof CometChat
        */
        export function removeGroupListener(name: string): void;
        
        /**
            * Function to add a Login Listener.
            *
            * @param {string} name
            * @param {LoginListener} loginListener
            * @memberof CometChat
        */
        export function addLoginListener(name: string, loginListener: LoginListener): void;
        
        /**
            * Function to remove a Login Listener.
            *
            * @param {string} name
            * @memberof CometChat
        */
        export function removeLoginListener(name: string): void;
        
        
        /**
            * Get the current connection status
            * @returns {string}
            * @memberof CometChat
        */
        export function getConnectionStatus(): string;
        
        /**
            * Returns a boolean value which indicates if the extension is enabled or not.
            * @param {string} extensionId
            * @returns {Promise<boolean>}
            * @memberof CometChat
        */
        export function isExtensionEnabled(extensionId: string): Promise<boolean>;
        
        /**
            * Returns an object of CCExtension Class which has the details of the extension.
            *
            * @param {string} extensionId
            * @returns  {Promise<CCExtension>}
            * @memberof CometChat
        */
        export function getExtensionDetails(extensionId: string): Promise<CCExtension>;
        
        /**
            * Get the XMPP/ WEBRTC details from the servers
            * @internal
            * @returns {Promise<Object>}
            * @memberof CometChat
        */
        export function getAppSettings(): Promise<Object>;

        /**
            * Returns a boolean value which indicates if a feature is enabled or not for the current plan.
            * @param {string} feature
            * @returns {Promise<boolean>}
            * @memberof CometChat
        */
        export function isFeatureEnabled(feature: string): Promise<boolean>;

        /**
            * Returns the numeric quota a feature is capped at for the current plan,
            * or null when the app settings carry no number for it.
            *
            * Same `settings.parameters` map as isFeatureEnabled() — the dashboard
            * keeps `.enabled` booleans and `.limit` numbers side by side under flat
            * dotted keys. Use this one for the `.limit` keys: isFeatureEnabled()
            * resolves the raw value through a boolean-shaped signature.
            *
            * null means "unknown quota" — do not enforce a limit on it.
            * @param {string} feature e.g. "features.ux.messages.pinned.limit"
            * @returns {Promise<number | null>}
            * @memberof CometChat
         */
        export function getFeatureLimit(feature: string): Promise<number | null>;

        /**
            * Clears the authtoken from server and clears the local cache.
            * @returns {Promise<Object>}
            * @memberof CometChat
        */
        export function logout(): Promise<Object>;
        
        /**
            * Function to call extension API.
            * @param {string} slug
            * @param {string} method
            * @param {string} endpoint
            * @param {Object} data
            * @returns {Promise<Object>}
            * @memberof CometChat
        */
        export function callExtension(slug: string, method: string, endpoint: string, data?: Object): Promise<Object>;

        /**
            *
            * Returns a boolean value which indicates if the AI Feature is enabled or not.
            * @param {string} featureKey
            * @returns {Promise<boolean>}
            * @memberof CometChat
         */
        export function isAIFeatureEnabled(featureKey: string): Promise<boolean>;
        
       
        /**
            * Function to get conversation starter for a particular conversation.
            * @param {string} receiverId
            * @param {string} receiverType
            * @param {Object} configuration
            * @returns {Promise<Array<string>>}
            * @memberof CometChat
        */
        export function getConversationStarter(receiverId: string, receiverType: string, configuration?: Object): Promise<Array<string>>;
        
        /**
             * Function to get smart replies in a conversation.
             * @param {string} receiverId
             * @param {string} receiverType
             * @param {Object} configuration
             * @returns {Promise<Object>}
             * @memberof CometChat
         */
        export function getSmartReplies(receiverId: string, receiverType: string, configuration?: Object): Promise<Object>;
        
        /**
             * Function to get assistance from a bot in a particular conversation.
             * @param {string} receiverId
             * @param {string} receiverType
             * @param {string} botUID
             * @param {string} question
             * @param {Object} configuration
             * @returns {Promise<string>}
             * @memberof CometChat
         */
        export function askBot(receiverId: string, receiverType: string, botUID: string, question: string, configuration?: Object): Promise<string>;
        
        /**
             * Function to get summary of a conversation.
             * @param {string} receiverId
             * @param {string} receiverType
             * @param {Object} configuration
             * @returns {Promise<string>}
             * @memberof CometChat
         */
        export function getConversationSummary(receiverId: string, receiverType: string, configuration?: Object): Promise<string>;
          
        /**
            * Function to set resource, platform and language variable.
            * @param {string} resource
            * @param {string} platform
            * @param {string} language
            * @memberof CometChat
        */
        export function setSource(resource: string, platform: string, language: string): void;
        
        /**
            * Function to set demo app details.
            * @internal
            * @memberof CometChat
         */
        export function setDemoMetaInfo(details: {
                    name: string;
                    type: string;
                    version: string;
                    platform: string;
        }): void;

        /**
            *
            * Method to connect to WebSocket server.
            *
            * @static
            * @returns void
            * @memberof CometChat
        */
        export function connect(props?: {onSuccess?: Function, onError?: Function}): void;
        
        /**
            *
            * Method to ping the WebSocket.
            *
            * @static
            * @returns void
            * @memberof CometChat
        */
        export function ping(props: {onError?: Function, onSuccess?: Function}): void;
        /**
            *
            * Method to disconnect from WebSocket server.
            *
            * @static
            * @returns void
            * @memberof CometChat
        */
        export function disconnect(props?: {onSuccess?: Function, onError?: Function}): void;

        /**
            * Mark the element of a message as interacted.
            * @param {string} messageId
            * @param {string} elementId
            * @memberof CometChat
        */
        export function markAsInteracted(messageId: string | any, elementId: string): Promise<string>;

         /**
        * Retrieves the ConversationUpdateSettings.
        *
        * @return A ConversationUpdateSettings object that holds the settings for updating the conversation.
        */
        export function getConversationUpdateSettings(): Promise<ConversationUpdateSettings>;



        /**
         * Function to get flag reasons.
         * @returns {Promise<FlagReason[]>}
         * @memberof CometChat
         */
        export function getFlagReasons(): Promise<FlagReason[]>;

        /**
         * Function to flag a message.
         * @param {string} messageId
         * @param {object} payload
         * @returns {Promise<FlagMessageResponse>}
         * @memberof CometChat
         */
        export function flagMessage(messageId: string, payload: { reasonId: string; remark?: string }): Promise<FlagMessageResponse>;
        // Notification Feed Methods
        export function addNotificationFeedListener(name: string, notificationFeedListener: NotificationFeedListener): void;
        export function removeNotificationFeedListener(name: string): void;
        /**
            * Function to add a Conversation Listener, for conversation pin/unpin events from the
            * logged-in user's other devices and from admin pins. The device that pins or unpins
            * receives no event — it learns the result from pinConversation/unpinConversation.
            * @param {string} name
            * @param {ConversationListener} conversationListener
            * @memberof CometChat
        */
        export function addConversationListener(name: string, conversationListener: ConversationListener): void;
        /**
            * Function to remove a Conversation Listener.
            * @param {string} name
            * @memberof CometChat
        */
        export function removeConversationListener(name: string): void;
        export function markFeedItemAsDelivered(feedItem: NotificationFeedItem): Promise<void>;
        export function markFeedItemsAsDelivered(feedItems: NotificationFeedItem[]): Promise<void>;
        export function markFeedItemAsRead(feedItem: NotificationFeedItem): Promise<void>;
        export function reportFeedEngagement(feedItem: NotificationFeedItem, interactionString: string): Promise<void>;
        export function getNotificationFeedUnreadCount(): Promise<{ count: number }>;
        export function getNotificationFeedItem(id: string): Promise<NotificationFeedItem>;
        export function markPushNotificationDelivered(pushNotification: PushNotification): Promise<void>;
        export function markPushNotificationClicked(pushNotification: PushNotification): Promise<void>;



/**
  *
  * @enum GoalType
  * 
 */
export enum GoalType {
    ANY_ACTION = "anyAction",
    ANY_OF = "anyOf",
    ALL_OF = "allOf",
    NONE = "none"
}

/**
  *
  * @module CometChatException
  * @implements {ErrorModel}
 */
export class CometChatException implements ErrorModel {
    code?: string | number;
    name?: string;
    message?: string;
    details?: string;
    /** Server-owned error parameters, e.g. `limit` on a pin/save cap breach. */
    errorParams?: { [key: string]: any };
    constructor(errorModel: ErrorModel);
}

/** @private */
export interface UserObj {
        uid: string;
        name: string;
        authToken: string;
        avatar: string;
        lastActiveAt: number;
        link: string;
        metadata: Object;
        role: string;
        status: string;
        statusMessage: string;
        tags: Array<string>;
}
/**
    * Implementation of UserObject
    */
export class User {
        /**
            * Method to get UID of the user.
            * @returns {string}
         */
        getUid(): string;
        /**
            * Method to set UID of the user.
            * @param {string} uid
         */
        setUid(uid: string): void;
        /**
            * Method to get name of the user.
            * @returns {string}
         */
        getName(): string;
        /**
            * Method to set name of the user.
            * @param {string} name
         */
        setName(name: string): void;
        /**
            * Method to get authToken of the user.
            * @returns {string}
         */
        getAuthToken(): string;
        /**
            * Method to set authToken of the user.
            * @param {string} authToken
         */
        setAuthToken(authToken: string): void;
        /**
            * Method to get avatar of the user.
            * @returns {string}
         */
        getAvatar(): string;
        /**
            * Method to set avatar of the user.
            * @param {string} avatar
         */
        setAvatar(avatar: string): void;
        /**
            * Method to get last active at timestamp of the user.
            * @returns {number}
         */
        getLastActiveAt(): number;
        /**
            * Method to set last active at timestamp of the user.
            * @param {number} lastActiveAt
         */
        setLastActiveAt(lastActiveAt: number): void;
        /**
            * Method to get link of the user.
            * @returns {string}
         */
        getLink(): string;
        /**
            * Method to set link of the user.
            * @param {string} link
         */
        setLink(link: string): string;
        /**
            * Method to get metadata of the user.
            * @returns {Object}
         */
        getMetadata(): Object;
        /**
            * Method to set metadata of the user.
            * @param {Object} metadata
         */
        setMetadata(metadata: Object): void;
        /**
            * Method to get role of the user.
            * @returns {string}
         */
        getRole(): string;
        /**
            * Method to set role of the user.
            * @param {string} role
         */
        setRole(role: string): void;
        /**
            * Method to get status of the user.
            * @returns {string}
         */
        getStatus(): string;
        /**
            * Method to set status of the user.
            * @param {string} status
         */
        setStatus(status: string): void;
        /**
            * Method to get status message of the user.
            * @returns {string}
         */
        getStatusMessage(): string;
        /**
            * Method to set status message of the user.
            * @param {string} statusMessage
         */
        setStatusMessage(statusMessage: string): void;
        setBlockedByMe(blockedByMe: boolean): void;
        /**
            * Method to know if the logged-in user has blocked the other user.
            * @returns {boolean}
         */
        getBlockedByMe(): boolean;
        setHasBlockedMe(hasBlockedMe: boolean): void;
        /**
            * Method to know if the logged-in user has been blocked by the other user.
            * @returns {boolean}
         */
        getHasBlockedMe(): boolean;
        /**
            * Method to set tags of the user.
            * @param {string[]} tags
         */
        setTags(tags: Array<string>): void;
        /**
            * Method to get tags of the user.
            * @returns {string[]}
         */
        getTags(): Array<string>;
        /**
         * Method to set deactivatedAt timestamp of a user.
         * @param {number} deactivatedAt 
        */
        setDeactivatedAt(deactivatedAt: number): void;
        /**
         * Method to get deactivatedAt timestamp of a user.
         * @returns {number}
        */
        getDeactivatedAt(): number;
        constructor(...userObj: any[]);
}

/**
    *
    * @module MediaMessage
 */
export class MediaMessage extends BaseMessage implements Message {
        /** @private */ static readonly TYPE: {
                TEXT: string;
                MEDIA: string;
                IMAGE: string;
                VIDEO: string;
                AUDIO: string;
                FILE: string;
                CUSTOM: string;
                ASSISTANT: string;
                TOOL_RESULT: string;
                TOOL_ARGUMENTS: string;
        };
        /** @private */ static readonly RECEIVER_TYPE: {
                USER: string;
                GROUP: string;
        };
        /** @private */ static readonly CATEGORY: {
                MESSAGE: string;
                ACTION: string;
                CALL: string;
                CUSTOM: string;
                INTERACTIVE: string;
                AGENTIC: string;
        };
        private url;
        private file;
        private files;
        private _metaData;
        protected data?: any;
        private attachment;
        private caption;
        private tags?: Array<String>;
        constructor(receiverId: string, file: object | string | Array<object> | any, type: string, receiverType: string);
        /**
            * Method to set caption for the media message.
            * @param {string} text
         */
        setCaption(text: string): void;
        /**
            * Method to get caption of the media message.
            * @returns {string}
         */
        getCaption(): string;
        /**
            * Method to get sender of the message.
            * @returns {User}
         */
        getSender(): User;
        /**
            * Method to get receiver of the message.
            * @returns {User | Group}
         */
        getReceiver(): User | Group;
        /**
            * Method to get metadata of the message.
            * @returns {Object}
         */
        getMetadata(): Object;
        /**
            * Method to set metadata of the message.
            * @param {Object} metadata
         */
        setMetadata(metadata: Object): void;
        /**
            * Method to get data of the message.
            * @returns {Object}
         */
        getData(): Object;
        /**
            * Method to set data of the message.
            * @param {Object} value
         */
        setData(value: Object): void;
        /**
            * The first attachment of the message — always the same attachment as
            * getAttachments()[0] — or null when the message has none.
            * @returns {Attachment}
         */
        getAttachment(): Attachment;
        /**
            * APPENDS an attachment. On a message holding `a`, setAttachment(b) leaves [a, b] and
            * getAttachment() is still `a`. null is a no-op. Use setAttachments(list) to replace.
            * @param {Attachment} attachment
         */
        setAttachment(attachment: Attachment): void;
        /**
         * Method to get all the attachments of media message.
         * @returns {Array<Attachment>}
        */
        getAttachments(): Array<Attachment>;
        /**
          * Method to set multiple attachments of media message.
          * @param {Array<Attachment>} attachments
        */
        setAttachments(attachments: Array<Attachment>): void;
        /**
            * Method to get URL of the media file.
            * @returns {string}
         */
        getURL(): string;
        /**
         * Get the tags of the message.
         * @returns {Array<String>}
         */
        getTags(): Array<String>;
         /**
          * @param {Array<String>} tags
          * Set the tags for the message.
          */
        setTags(tags: Array<String>): void;
        /**
            * Gets the moderation status of the message.
            * @description If the message is not moderated, it returns "unmoderated".
            * If the message is moderated, it returns the status of the moderation.
            * @returns {string}
         */
        getModerationStatus(): string;
}

/**
    *
    * @module BaseMessage
 */
export interface Message {
}
/**
    *Basic Message Object
    *
    * @export
    * @class BaseMessage
    */
export class BaseMessage implements Message {
        protected id?: number;
        protected conversationId?: string;
        protected parentMessageId?: number;
        protected muid?: string;
        protected sender?: User;
        protected receiverId?: string;
        protected receiver?: User | Group;
        protected data?: object;
        protected reactions?: ReactionCount[];
        protected type?: string;
        protected category?: MessageCategory;
        protected receiverType?: string;
        protected sentAt?: number;
        protected deliveredAt?: number;
        protected readAt?: number;
        protected deliveredToMeAt?: number;
        protected readByMeAt?: number;
        protected metadata: Object;
        protected status?: string;
        protected receipts?: any[];
        protected readReceipts?: MessageReceipt[];
        protected deliveryReceipts?: MessageReceipt[];
        protected editedAt: number;
        protected editedBy: string;
        protected deletedAt: number;
        protected deletedBy: string;
        protected replyCount: number;
        protected rawMessage: Object;
        protected unreadRepliesCount: number;
        protected mentionedUsers?: User[];
        protected mentionedMe?: boolean;
        protected quotedMessageId?: number;
        protected quotedMessage?: BaseMessage;
        constructor(receiverId: string, messageType: string, receiverType: string, category: MessageCategory);
        /**
        * Get unread replies count of the message
        * @returns {number}
        */
        getUnreadRepliesCount(): number;
        /**
         * @param {number}
         * Set unread replies count of the message
         */
        setUnreadRepliesCount(value: number): void;
        /**
            * Get ID of the message
            * @returns {number}
         */
        getId(): number;
        /**
            * @param {number} value
            * Set ID of the message
         */
        setId(value: number): void;
        /**
            * Get conversation ID of the message.
            * @returns {string}
         */
        getConversationId(): string;
        /**
            * @param {string} value
            * Set conversation ID of the message.
         */
        setConversationId(value: string): void;
        /**
            * Get parent message ID of the message.
            * @returns {number}
         */
        getParentMessageId(): number;
        /**
            * @param {number} value
            * Set parent message ID of the message.
         */
        setParentMessageId(value: number): void;
        /**
            * Whether the requesting user follows this message's thread. Per-viewer.
            *
            * Only populated on responses to requests that ASKED for it
            * (`withThreadSubscribed=true`). A socket-delivered message carries no flag and
            * therefore reads false — which means "the server did not tell me", NOT "the user
            * is unsubscribed". The one exception is a message the logged-in user SENT and
            * then fetched: the author is subscribed by default, so false there is an explicit
            * unsubscribe and must not be overridden.
        */
        isThreadSubscribed(): boolean;
        setThreadSubscribed(value: boolean): void;
        /**
            * Get MUID of the message.
            * @returns {string}
         */
        getMuid(): string;
        /**
            * @param {string} value
            * Sets the MUID of the message.
         */
        setMuid(value: string): void;
        /** Offline: the SDK-generated local id — the stable message handle until the server id arrives (never `muid`). */
        getLocalMessageId(): string | undefined;
        /** Offline: derived message status — PENDING | SENDING | SENT | DELIVERED | READ | FAILED. */
        getMessageStatus(): MessageStatus;
        /** Offline (BEH-SEND-35): why this queued send FAILED, or `undefined` when it has not failed. Never serialized to the server; cleared on retry (→ PENDING) and on send. */
        getFailureReason(): MessageFailureReason | undefined;
        /** Offline: REALTIME (live socket) vs SYNC (delivered by a reconnect catch-up sweep — suppress notification sounds). */
        getSource(): MessageSource;
        /**
            * Get sender of the message.
            * @returns {User}
         */
        getSender(): User;
        /**
            * @param {User} value
            * Set sender of the message.
         */
        setSender(value: User): void;
        /**
            * Get receiver of the message.
            * @returns {User | Group}
         */
        getReceiver(): User | Group;
        /**
            * @param {User | Group} value
            * Set receiver of the message.
         */
        setReceiver(value: User | Group): void;
        /**
            * Get receiverID of the message.
            * @returns {string}
         */
        getReceiverId(): string;
        /**
            * @param {string} value
            * Set receiverId of the message.
         */
        setReceiverId(value: string): void;
        /**
            * Get type of the message.
            * @returns {string}
         */
        getType(): string;
        /**
            * @param {string} value
            * Set type of the message.
         */
        setType(value: string): void;
        /**
            * Get receiver type of the message.
            * @returns {string}
         */
        getReceiverType(): string;
        /**
            * @param {string} value
            * Set the receiver type of the message.
         */
        setReceiverType(value: string): void;
        /**
            * Get message's sentAt timestamp.
            * @returns {number}
         */
        getSentAt(): number;
        /**
            * @param {number} value
            * Set message's sentAt timestamp.
         */
        setSentAt(value: number): void;
        /** @private */
        getStatus(): string;
        /** @private */
        setStatus(value: string): void;
        /**
            * Get delivery timestamp of the message.
            * @returns {number}
         */
        getDeliveredAt(): number;
        /**
            * @param {number} deliveredAt
            * Set delivery timestamp of the message.
         */
        setDeliveredAt(deliveredAt: number): void;
        /**
            * Get timestamp of the message at which it was delivered to logged in user.
            * @returns {number}
         */
        getDeliveredToMeAt(): number;
        /**
            * @param {number} deliveredToMeAt
            * Set timestamp of the message at which it was delivered to logged in user.
         */
        setDeliveredToMeAt(deliveredToMeAt: number): void;
        /**
            * Get read timestamp of the message.
            * @returns {number}
         */
        getReadAt(): number;
        /**
            * @param {number} readAt
            * Set read timestamp of the message.
         */
        setReadAt(readAt: number): void;
        /**
            * Get timestamp of the message at which it was read by the logged in user.
            * @returns {number}
         */
        getReadByMeAt(): number;
        /**
            * @param {number} readByMeAt
            * Set timestamp of the message at which it was read by the logged in user.
         */
        setReadByMeAt(readByMeAt: number): void;
        /**
            * Get category of the message.
            * @returns {string}
         */
        getCategory(): MessageCategory;
        /**
            * @param {string} category
            * Set category of the message.
         */
        setCategory(category: MessageCategory): void;
        /**
            * Get timestamp of the message when it was updated/edited.
            * @returns {number}
         */
        getEditedAt(): number;
        /**
            * @param {number} editedAt
            * Set timestamp of the message when it was updated/edited.
         */
        setEditedAt(editedAt: number): void;
        /**
            * Get UID of the user who edited/updated the message.
            * @returns {string}
         */
        getEditedBy(): string;
        /**
            * @param {string} editedBy
            * Set UID of the user who edited/updated the message.
         */
        setEditedBy(editedBy: string): void;
        /**
            * Get timestamp of the message when it was deleted.
            * @returns {number}
         */
        getDeletedAt(): number;
        /**
            * @param {number} deletedAt
            * Set timestamp of the message when it was deleted.
         */
        setDeletedAt(deletedAt: number): void;
        /**
            * Get UID of the user who deleted the message.
            * @returns {number}
         */
        getDeletedBy(): string;
        /**
            * @param {string} deletedBy
            * Set UID of the user who deleted the message.
         */
        setDeletedBy(deletedBy: string): void;
        /**
            * Get the server-side timestamp of when the message was last updated.
            * @returns {number}
         */
        getUpdatedAt(): number;
        /**
            * @param {number} updatedAt
            * Set the server-side timestamp of when the message was last updated.
         */
        setUpdatedAt(updatedAt: number): void;
        /**
            * Get the timestamp at which the message was pinned to its conversation.
            * Conversation-wide and visible to everyone.
            *
            * Returns undefined when the message is not pinned — the presence of this
            * value IS the pinned flag, so test it with `!== undefined` and never
            * expect 0.
            * @returns {number}
         */
        getPinnedAt(): number;
        /**
            * @param {number} pinnedAt pass undefined to clear the pin
            * Set the timestamp at which the message was pinned.
         */
        setPinnedAt(pinnedAt: number): void;
        /**
            * Get the UID of the user who pinned the message, or `app_system` for an
            * admin/global pin. Only the MOST RECENT pinner is retained.
            *
            * Returns undefined when the message is not pinned.
            * @returns {string}
         */
        getPinnedBy(): string;
        /**
            * @param {string} pinnedBy pass undefined to clear
            * Set the UID of the user who pinned the message.
         */
        setPinnedBy(pinnedBy: string): void;
        /**
            * Get the timestamp at which the logged-in user saved the message.
            *
            * Per-viewer and private: it is only ever populated in the acting user's
            * own context, and returns undefined when the message is not saved.
            * @returns {number}
         */
        getSavedAt(): number;
        /**
            * @param {number} savedAt pass undefined to clear
            * Set the timestamp at which the logged-in user saved the message.
         */
        setSavedAt(savedAt: number): void;
        /**
            * Get the number of replies of the message.
            * @returns {number}
         */
        getReplyCount(): number;
        /**
            * @param {number} value
            * Set the number of replies of the message.
         */
        setReplyCount(value: number): void;
        /**
            * Get the raw JSON of the message.
            * @returns
         */
        getRawMessage(): Object;
        /**
            * @param {Object} rawMessage
            * Set the raw JSON of the message.
         */
        setRawMessage(rawMessage: Object): void;
        /**
            * @param {User[]} mentionedUsers
            * Set the array of mentioned users
         */
        setMentionedUsers(mentionedUsers: User[]): void;
        /**
            * Get the array of mentioned users
            * @returns
            */
        getMentionedUsers(): User[];
        /**
            * @param {boolean} hasMentionedMe
            * Method to set if the user was mentioned in the message
            */
        setHasMentionedMe(hasMentionedMe: boolean): void;
        /**
            * Method to check if the user was mentioned in the message
            * @returns
            */
        hasMentionedMe(): boolean;
        /**
            * Method to get data of the message.
            * @returns {Object}
            */
        getData(): any;
        /**
            * Method to set data of the message.
            * @param {Object} value
            */
        setData(value: object): void;
        /**
            * set the array of reactions in message
            * @param {ReactionCount[]} reactions
        */
        setReactions(reactions: any): ReactionCount[];
        /**
            * Get the array of reactions in message
            * @returns {ReactionCount[]}
            */
        getReactions(): ReactionCount[];
         /**
         * Get quoted message ID of the message.
         * @returns {number}
        */
        getQuotedMessageId(): number;
        /**
         * @param {number} value
         * Set quoted message ID of the message.
        */
        setQuotedMessageId(value: number): void;
        /**
         * Get quoted message of the message.
         * @returns {BaseMessage}
        */
        getQuotedMessage(): BaseMessage;
        /**
         * @param {BaseMessage} value
         * Set quoted message of the message.
        */
        setQuotedMessage(value: BaseMessage): void;
}

/**
    *
    * @module TextMessage
 */
export class TextMessage extends BaseMessage implements Message {
        /** @private */ static readonly TYPE: string;
        /** @private */ static readonly RECEIVER_TYPE: {
                USER: string;
                GROUP: string;
        };
        /** @private */ static readonly CATEGORY: string;
        private text?;
        protected data?;
        private processedText?;
        private tags?;
        /**
            *Creates an instance of TextMessage.
            * @param {string} receiverUid
            * @param {string} text
            * @param {string} senderUid
            * @param {string} receiverType
            * @memberof TextMessage
            */
        constructor(receiverId: string, text: string, receiverType: string);
        /**
            * Method to get sender of the message.
            * @returns {User}
         */
        getSender(): User;
        /**
            * Method to get receiver of the message.
            * @returns {User | Group}
         */
        getReceiver(): User | Group;
        /**
            * Method to get metadata of the message.
            * @returns {Object}
         */
        getMetadata(): Object;
        /**
            * Method to set metadata of the message.
            * @param {Object} value
         */
        setMetadata(value: Object): void;
        /**
            * Method to get data of the message.
            * @returns {Object}
         */
        getData(): any;
        /**
            * Method to set data of the message.
            * @param {Object} value
         */
        setData(value: any): void;
        /**
            * Method to get text of the message.
            * @returns {string}
         */
        getText(): string;
        /**
            * Method to set text of the message.
            * @param {string} text
         */
        setText(text: string): void;
        /** @internal */
        setProcessedText(text: string): void;
        /** @internal */
        getProcessedText(): string;
        /**
         * Get the tags of the message.
         * @returns {Array<String>}
         */
        getTags(): Array<String>;
         /**
          * @param {Array<String>} tags
          * Set the tags for the message.
          */
        setTags(tags: Array<String>): void;
        /**
            * Gets the moderation status of the message.
            * @description If the message is not moderated, it returns "unmoderated".
            * If the message is moderated, it returns the status of the moderation.
            * @returns {string}
         */
        getModerationStatus(): string;
}

export const constants: {
    DEFAULT_STORE: string;
    MSG_VER_PRE: string;
    MSG_VER_POST: string;
};
export const DEFAULT_VALUES: {
    ZERO: number;
    MSGS_LIMIT: number;
    REACTIONS_LIMIT: number;
    MSGS_MAX_LIMIT: number;
    USERS_LIMIT: number;
    USERS_MAX_LIMIT: number;
    GROUPS_LIMIT: number;
    GROUPS_MAX_LIMIT: number;
    CONVERSATION_MAX_LIMIT: number;
    CALL_TIMEOUT: number;
    DEFAULT_MSG_ID: number;
    DEFAULT_MAX_TYPING_INDICATOR_LIMIT: number;
    REGION_DEFAULT: string;
    REGION_DEFAULT_EU: string;
    REGION_DEFAULT_US: string;
    REGION_DEFAULT_IN: string;
    REGION_DEFAULT_PRIVATE: string;
    REACTIONS_MAX_LIMIT: number;
};
export enum GroupType {
    Public = "public",
    Private = "private",
    Protected = "protected",
    Password = "password"
}
export const GROUP_TYPE: {
    PUBLIC: string;
    PRIVATE: string;
    PROTECTED: string;
    PASSWORD: string;
};
export enum GroupMemberScope {
    Admin = "admin",
    Moderator = "moderator",
    Member = "member"
}
export const GROUP_MEMBER_SCOPE: {
    ADMIN: string;
    MODERATOR: string;
    PARTICIPANT: string;
};
export const APPINFO: {
    platform: string;
    sdkVersion: string;
    apiVersion: string;
    sdkVersionWithUnderScore: string;
    userAgent: string;
};
export const SDKHeader: {
    platform: string;
    sdkVersion: string;
    sdk: string;
};
export const WS: {
    CONVERSATION: {
        TYPE: {
            CHAT: string;
            GROUP_CHAT: string;
        };
    };
};
export const ANALYTICS: {
    analyticsHost: string;
    analyticsVersion: string;
};
export const LOCAL_STORE: {
    COMMON_STORE: string;
    MESSAGE_LISTENERS_LIST: string;
    USERS_STORE: string;
    MESSAGES_STORE: string;
    KEYS_STORE: string;
    STORE_STRING: string;
    KEY_STRING: string;
    KEY_USER: string;
    KEY_APP_SETTINGS: string;
    KEY_APP_ID: string;
    KEY_DEVICE_ID: string;
    KEY_SESSION_ID: string;
    KEY_MESSAGE_LISTENER_LIST: string;
};
export const ResponseConstants: {
    RESPONSE_KEYS: {
        KEY_DATA: string;
        KEY_META: string;
        KEY_CURSOR: string;
        KEY_NEXT: string;
        KEY_PREVIOUS: string;
        KEY_ACTION: string;
        KEY_MESSAGE: string;
        KEY_ERROR: string;
        KEY_ERROR_DETAILS: string;
        KEY_ERROR_CODE: string;
        KEY_ERROR_MESSAGE: string;
        KEY_AUTH_TOKEN: string;
        KEY_WS_CHANNEL: string;
        KEY_IDENTITY: string;
        KEY_SERVICE: string;
        KEY_ENTITIES: string;
        KEY_REACTIONS: string;
        KEY_ENTITITY: string;
        KEY_ENTITYTYPE: string;
        KEY_ATTACHMENTS: string;
        CODE_REQUEST_OK: number;
        CODE_BAD_REQUEST: number;
        UNREAD_UNDELIVERED_KEYS: {
            ENTITY: string;
            ENTITY_TYPE: string;
            ENTITY_Id: string;
            COUNT: string;
        };
        GROUP_MEMBERS_RESPONSE: {
            SUCCESS: string;
            ERROR: string;
            MESSAGE: string;
        };
        KEY_ENTITY_TYPE: {
            USER: string;
            GROUP: string;
        };
        KEY_CONVERSATION_STARTER: string;
        KEY_SMART_REPLIES: string;
        KEY_CONVERSATION_SUMMARY: string;
        KEY_BOT_REPLY: string;
    };
};

export const DELIVERY_RECEIPTS: {
    RECEIVER_ID: string;
    RECEIVER_TYPE: string;
    RECIPIENT: string;
    MESSAGE_ID: string;
    RECEIVED: string;
    DELIVERED_AT: string;
    ID: string;
    TIME: string;
    DELIVERED_TO_ME_AT: string;
};
export const READ_RECEIPTS: {
    RECEIVER_ID: string;
    RECEIVER_TYPE: string;
    RECIPIENT: string;
    MESSAGE_ID: string;
    READ: string;
    READ_AT: string;
    ID: string;
    TIME: string;
    READ_BY_ME_AT: string;
};
export const MessageConstatnts: {
    TYPE: {
        TEXT: string;
        MEDIA: string;
        IMAGE: string;
        VIDEO: string;
        AUDIO: string;
        FILE: string;
        CUSTOM: string;
        ASSISTANT: string;
        TOOL_RESULT: string;
        TOOL_ARGUMENTS: string;
    };
    CATEGORY: {
        MESSAGE: string;
        ACTION: string;
        CALL: string;
        CUSTOM: string;
        INTERACTIVE: string;
        AGENTIC: string;
    };
    RECEIVER_TYPE: {
        USER: string;
        GROUP: string;
    };
    KEYS: {
        ATTATCHMENT: string;
        ATTATCHMENTS: string;
        ACTION: string;
        TYPE: string;
        DATA: string;
        ID: string;
        MUID: string;
        SENDER: string;
        RECEIVER: string;
        RECEIVER_ID: string;
        CATEGORY: string;
        RECEIVER_TYPE: string;
        SENT_AT: string;
        STATUS: string;
        TEXT: string;
        URL: string;
        METADATA: string;
        RECEIPTS: string;
        MY_RECEIPTS: string;
        CUSTOM_DATA: string;
        CUSTOM_SUB_TYPE: string;
        RESOURCE: string;
        MENTIONS: string;
        INTERACTIVE_DATA: string;
        INTERACTION_GOAL: string;
        INTERACTIONS: string;
        ALLOW_SENDER_INTERACTION: string;
        ELEMENT_ID: string;
        INTERACTED_AT: string;
        ELEMENT_IDS: string;
        RUN_ID: string;
        THREAD_ID: string;
        TOOL_CALLS: string;
        FUNCTION: string;
        NAME: string;
        ARGUMENTS: string;
        TOOL_CALL_ID: string;
        DISPLAY_NAME: string;
        EXECUTION_TEXT: string;
    };
    KNOWN_MEDIA_TYPE: {
        IMAGE: any[];
        VIDEO: any[];
        AUDIO: any[];
        FILE: any[];
    };
    PAGINATION: {
        AFFIX: {
            APPEND: string;
            PREPEND: string;
        };
        CURSOR_FILEDS: {
            ID: string;
            SENT_AT: string;
        };
        CURSOR_AFFIX_DEFAULT: string;
        CURSOR_FIELD_DEFAULT: string;
        KEYS: {
            PER_PAGE: string;
            CURSOR_AFFIX: string;
            AFFIX: string;
            CURSOR_FIELD: string;
            CURSOR_VALUE: string;
            UID: string;
            SENT_AT: string;
            ID: string;
            CURRENT_PAGE: string;
            UNREAD: string;
            HIDE_MESSAGES_FROM_BLOCKED_USER: string;
            SEARCH_KEY: string;
            ONLY_UPDATES: string;
            UPDATED_AT: string;
            CATEGORY: string;
            CATEGORIES: string;
            TYPE: string;
            TYPES: string;
            HIDE_REPLIES: string;
            HIDE_DELETED_MESSAGES: string;
            MENTIONS_WITH_TAG_INFO: string;
            MENTIONS_WITH_BLOCKED_INFO: string;
            ONLY_INTERACTION_GOAL_COMPLETED: string;
            HAS_ATTACHMENTS: string;
            HAS_LINKS: string;
            HAS_MENTIONS: string;
            HAS_REACTIONS: string;
            MENTIONED_UIDS: string;
            ATTACHMENT_TYPES: string;
            HIDE_QUOTED_MESSAGES: string;
            WITH_PARENT: string;
        };
    };
};
export const ATTACHMENTS_CONSTANTS: {
    KEYS: {
        EXTENSION: string;
        MIME_TYPE: string;
        NAME: string;
        SIZE: string;
        URL: string;
    };
};
export enum MessageCategory {
    ACTION = "action",
    MESSAGE = "message",
    CALL = "call",
    CUSTOM = "custom",
    INTERACTIVE = "interactive",
    AGENTIC = "agentic"
}
export const TYPING_NOTIFICATION: {
    RECEIVER_ID: string;
    RECEIVER_TYPE: string;
    META: string;
    KEYS: {
        TYPING_NOTIFICATION: string;
        TIMESTAMP: string;
    };
    ACTIONS: {
        STARTED: string;
        ENDED: string;
    };
};
export const ActionConstatnts: {
    ACTION_SUBJECTS: {
        ACTION_ON: string;
        ACTION_BY: string;
        ACTION_FOR: string;
    };
    ACTION_ENTITY_TYPE: {
        GROUP_USER: string;
        USER: string;
        GROUP: string;
        MESSAGE: string;
    };
    ACTION_KEYS: {
        ACTION_CREATED: string;
        ACTION_UPDATED: string;
        ACTION_DELETED: string;
        ENTITIES: string;
        ENTITY: string;
        ENTITY_TYPE: string;
        TYPE_MEMBER_JOINED: string;
        TYPE_MEMBER_LEFT: string;
        TYPE_MEMBER_KICKED: string;
        TYPE_MEMBER_BANNED: string;
        TYPE_MEMBER_UNBANNED: string;
        TYPE_MEMBER_INVITED: string;
        TYPE_MEMBER_ADDED: string;
        ACTION_SCOPE_CHANGED: string;
        ACTION_TYPE_USER: string;
        ACTION_TYPE_GROUP: string;
        ACTION_TYPE_GROUP_MEMBER: string;
        TYPE_MESSAGE_EDITED: string;
        TYPE_MESSAGE_DELETED: string;
        ACTION_TYPE_CALL: string;
        EXTRAS: string;
        SCOPE: string;
        NEW: string;
        OLD: string;
    };
    ActionMessages: {
        ACTION_GROUP_JOINED_MESSAGE: string;
        ACTION_GROUP_LEFT_MESSAGE: string;
        ACTION_MEMBER_KICKED_MESSAGE: string;
        ACTION_MEMBER_BANNED_MESSAGE: string;
        ACTION_MEMBER_UNBANNED_MESSAGE: string;
        ACTION_MEMBER_INVITED_MESSAGE: string;
        ACTION_MESSAGE_EDITED_MESSAGE: string;
        ACTION_MESSAGE_DELETED_MESSAGE: string;
        ACTION_MEMBER_SCOPE_CHANGED: string;
        ACTION_MEMBER_ADDED_TO_GROUP: string;
    };
    ACTION_TYPE: {
        TYPE_MEMBER_JOINED: string;
        TYPE_MEMBER_LEFT: string;
        TYPE_MEMBER_KICKED: string;
        TYPE_MEMBER_BANNED: string;
        TYPE_MEMBER_UNBANNED: string;
        TYPE_MEMBER_INVITED: string;
        TYPE_MEMBER_SCOPE_CHANGED: string;
        TYPE_MESSAGE: string;
        TYPE_MESSAGE_EDITED: string;
        TYPE_MESSAGE_DELETED: string;
        TYPE_MEMBER_ADDED: string;
    };
    ACTIONS: {
        MEMBER_ADDED: string;
        MEMBER_JOINED: string;
        MEMBER_LEFT: string;
        MEMBER_KICKED: string;
        MEMBER_BANNED: string;
        MEMBER_UNBANNED: string;
        MEMBER_INVITED: string;
        MEMBER_SCOPE_CHANGED: string;
        MESSAGE_EDITED: string;
        MESSSAGE_DELETED: string;
        TYPE_USER: string;
        TYPE_GROUP: string;
        TYPE_GROUP_MEMBER: string;
    };
};
export const BlockedUsersConstants: {
    REQUEST_KEYS: {
        DIRECTIONS: {
            BOTH: string;
            HAS_BLOCKED_ME: string;
            BLOCKED_BY_ME: string;
        };
    };
};
export const CallConstants: {
    CALL_MODE: {
        DEFAULT: string;
        SPOTLIGHT: string;
        SINGLE: string;
    };
    AUDIO_MODE: {
        SPEAKER: string;
        EARPIECE: string;
        BLUETOOTH: string;
        HEADPHONES: string;
    };
    CALL_TYPE: {
        AUDIO: string;
        VIDEO: string;
    };
    RECEIVER_TYPE_GROUP: string;
    RECEIVER_TYPE_USER: string;
    CALL_KEYS: {
        CALL_DATA: string;
        CALL_ID: string;
        CALL_SESSION_ID: string;
        CALL_RECEIVER: string;
        CALL_SENDER: string;
        CALL_RECEIVER_TYPE: string;
        CALL_STATUS: string;
        CALL_TYPE: string;
        CALL_INITIATED_AT: string;
        CALL_JOINED_AT: string;
        CALL_LEFT_AT: string;
        CALL_METADATA: string;
        CALL_ENTITIES: string;
        CALL_ENTITY_TYPE: string;
        CALL_ENTITY: string;
        CALL_ENTITY_USER: string;
        CALL_ENTITY_GROUP: string;
    };
    CALL_STATUS: {
        INITIATED: string;
        ONGOING: string;
        UNANSWERED: string;
        REJECTED: string;
        BUSY: string;
        CANCELLED: string;
        ENDED: string;
    };
};
export const GroupConstants: {
    KEYS: {
        NAME: string;
        GUID: string;
        TYPE: string;
        PASSWORD: string;
        ICON: string;
        DESCRIPTION: string;
        OWNER: string;
        METADATA: string;
        CREATED_AT: string;
        UPDATED_AT: string;
        HAS_JOINED: string;
        WS_CHANNEL: string;
        TAGS: string;
    };
};
export const GroupMemersConstans: {
    KEYS: {
        SCOPE: string;
        UID: string;
        GUID: string;
        USER: string;
        NAME: string;
    };
};
export const UserConstants: {
    UID: string;
    NAME: string;
    AUTH_TOKEN: string;
    AVATAR: string;
    LAST_ACTIVE_AT: string;
    LINK: string;
    META_DATA: string;
    ROLE: string;
    STATUS: string;
    STATUS_MESSAGE: string;
    USER_NAME: string;
    TAGS: string;
};
export const Errors: {
    ERROR_IO_EXCEPTION: string;
    ERROR_JSON_EXCEPTION: string;
    ERROR_PASSWORD_MISSING: string;
    ERROR_LIMIT_EXCEEDED: string;
    ERROR_USER_NOT_LOGGED_IN: string;
    ERROR_INVALID_GUID: string;
    ERROR_PASSWORD_MISSING_MESSAGE: string;
    ERROR_LIMIT_EXCEEDED_MESSAGE: string;
    ERROR_USER_NOT_LOGGED_IN_MESSAGE: string;
    ERROR_INVALID_GUID_MESSAGE: string;
    ERROR_DEFAULT_MESSAGE: string;
    ERR_SETTINGS_HASH_OUTDATED: string;
    ERR_NO_AUTH: string;
};
export const CALL_ERROR: {
    CALL_ALREADY_INITIATED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    ERROR_IN_CALLING: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    CANNOT_ACCEPT_CALL: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    NOT_INITIALIZED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    NOT_LOGGED_IN: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    SESSION_ID_REQUIRED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    JWT_NOT_FOUND: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MODULE_NOT_INSTALLED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export const PARAMETER_ERROR: {
    PARAMETER_REQUIRED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export const GENERAL_ERROR: {
    MUST_BE_A_STRING: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MUST_BE_A_NUMBER: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MUST_BE_A_OBJECT: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MUST_BE_AN_ARRAY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MUST_BE_A_BOOLEAN: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MUST_BE_A_BLOB: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    INVALID: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    METHOD_COMPULSORY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    LIMIT_EXCEEDED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MUST_BE_A_POSITIVE_NUMBER: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    INVALID_MEDIA_FILE: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    EMPTY_STRING: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MISSING_KEY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    EMPTY_ARRAY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    INVALID_SEARCH_KEYWORD: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    INVALID_GROUP_PROPERTY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    INVALID_USER_PROPERTY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    PARAMETER_MUST_BE_A_NUMBER: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    PARAMETER_MUST_BE_AN_ARRAY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    PARAMETER_MUST_BE_A_BOOLEAN: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    PARAMETER_MUST_BE_A_POSITIVE_NUMBER: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    PARAMETER_MUST_BE_A_STRING: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    PARAMETER_COMPULSORY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    PASSWORD_COMPULSORY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    INVALID_ARRAY: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export const ReceiptErrors: {
    MISSING_PARAMETERS: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    INVALID_PARAMETER: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    NO_WEBSOCKET_CONNECTION: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    RECEIPTS_TEMPORARILY_BLOCKED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    UNKNOWN_ERROR_OCCURRED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export const UserErrors: {
    INVALID_STATUS: CometChatException;
    INVALID_DIRECTION: CometChatException;
    USER_NOT_LOGGED_IN: CometChatException;
};
export const GroupErrors: {
    NOT_A_GROUP: CometChatException;
    INVALID_SCOPE: CometChatException;
    INVALID_GROUP_TYPE: CometChatException;
};
export const ConversationErrors: {
    INVALID_CONVERSATION_TYPE: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
    CONVERSATION_NOT_FOUND: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
};

export const AIFeatureError: {
    INVALID_AI_FEATURE: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};

export const AI_FEATURE_ACCESSIBLE = "features.ai.accessible";
export const AI_FEATURE_ENABLED = "features.ai.enabled";
export const AI_SLUG_ACCESSIBLE = "features.ai.%s.accessible";
export const AI_SLUG_ENABLED = "features.ai.%s.enabled";
export enum AttachmentType {
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio",
    FILE = "file"
}
export const AI_ASSISTANT_EVENTS: {
    RUN_STARTED: string;
    RUN_FINISHED: string;
    TEXT_MESSAGE_START: string;
    TEXT_MESSAGE_END: string;
    TEXT_MESSAGE_CONTENT: string;
    TOOL_CALL_STARTED: string;
    TOOL_CALL_ENDED: string;
    TOOL_CALL_RESULT: string;
    TOOL_CALL_ARGUMENT: string;
};

export const validateQuestion: (question: any) => CometChatException;

export const AIErrors: {
    NO_CONVERSATION_STARTER: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
    NO_SMART_REPLY: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
    NO_CONVERSATION_SUMMARY: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
    NO_ASSISTANCE: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
};
export enum REACTION_ACTION {
    REACTION_ADDED = "message_reaction_added",
    REACTION_REMOVED = "message_reaction_removed"
}
export const ExtensionErrors: {
    INVALID_EXTENSION: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    EXTENSION_NOT_FOUND: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export const MessageErrors: {
    INVALID_RECEIVER_TYPE: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
};
export const FeatureRestrictionErrors: {
    INVALID_FEATURE: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    FEATURE_NOT_FOUND: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export const PresenceConstatnts: {
    STATUS: {
        ONLINE: string;
        AVAILABLE: string;
        OFFLINE: string;
        JOINED: string;
        LEFT: string;
    };
};
export const APP_SETTINGS: {
    APP_SETTINGS: string;
    KEYS: {
        CHAT_HOST: string;
        CHAT_USE_SSL: string;
        GROUP_SERVICE: string;
        CALL_SERVICE: string;
        CHAT_WS_PORT: string;
        CHAT_WSS_PORT: string;
        CHAT_HTTP_BIND_PORT: string;
        CHAT_HTTPS_BIND_PORT: string;
        ADMIN_API_HOST: string;
        CLIENT_API_HOST: string;
        WEBRTC_HOST: string;
        WEBRTC_USE_SSL: string;
        WEBRTC_WS_PORT: string;
        WEBRTC_WSS_PORT: string;
        WEBRTC_HTTP_BIND_PORT: string;
        WEBRTC_HTTPS_BIND_PORT: string;
        EXTENSION_LIST: string;
        EXTENSION_KEYS: {
            ID: string;
            NAME: string;
        };
        JID_HOST_OVERRIDE: string;
        CHAT_HOST_OVERRIDE: string;
        CHAT_HOST_APP_SPECIFIC: string;
        MODE: string;
        CONNECTION_TYPE: string;
        DEFAULT_MODE: string;
        LIMITED_TRANSIENT: string;
        NO_TRANSIENT: string;
        ANALYTICS_PING_DISABLED: string;
        ANALYTICS_HOST: string;
        ANALYTICS_VERSION: string;
        ANALYTICS_USE_SSL: string;
        SETTINGS_HASH: string;
        SETTINGS_HASH_RECEIVED_AT: string;
        APP_VERSION: string;
        PARAMETERS: string;
        CORE_CONVERSATIONS_UPDATE_ON_CALL_ACTIVITIES: string;
        CORE_CONVERSATIONS_UPDATE_ON_GROUP_ACTIONS: string;
        CORE_CONVERSATIONS_UPDATE_ON_CUSTOM_MESSAGES: string;
        CORE_CONVERSATIONS_UPDATE_ON_REPLIES: string;
    };
};
export const COMMON_UTILITY_CONSTANTS: {
    TYPE_CONSTANTS: {
        BOOLEAN: string;
        STRING: string;
        OBJECT: string;
        NUMBER: string;
    };
};
export const CONNECTION_STATUS: {
    CONNECTED: string;
    CONNECTING: string;
    DISCONNECTED: string;
    FEATURE_THROTTLED: string;
};
export const API_ERROR_CODES: {
    AUTH_ERR_AUTH_TOKEN_NOT_FOUND: string;
};
export const PROSODY_API: {
    DOMAIN_PREFIX: string;
    PATH: {
        ROOM: string;
        ROOM_SIZE: string;
        SESSIONS: string;
    };
    RESPONSE: {
        PARTICIPANTS: string;
    };
    QUERY_PARAMETERS: {
        DOMAIN: string;
        ROOM: string;
    };
};
export const ProsodyApiErrors: {
    INVALID_SESSIONID: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
    INVALID_TYPE: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
};
export const JWT_API: {
    KEYS: {
        PASSTHROUGH: string;
        EXPAND: string;
    };
};
export const ONLINE_MEMBER_COUNT_API: {
    ENDPOINTS: {
        GET_ONLINE_MEMBER_COUNT: string;
    };
    RESPONSE: {
        ONLINE_USERS_COUNT: string;
        GROUPS: string;
    };
    ERRORS: {
        INVALID_GROUPLIST: {
            code: string;
            name: string;
            message: string;
            details: string;
        };
    };
};

/**
    *
    * @module Group
 */
export class Group {
        /** @private */ static readonly TYPE: typeof GroupType;
        /** @private */ static readonly Type: typeof GroupType;
        private guid;
        private name;
        private type;
        private password;
        private icon;
        private description;
        private owner;
        private metadata;
        private createdAt;
        private updatedAt;
        private hasJoined;
        private wsChannel;
        private scope;
        private joinedAt;
        private membersCount;
        private tags;
        private isBanned;
        /**
            * Creates an instance of Group.
            * @param {string} guid
            * @param {string} name
            * @param {GroupType} type
            * @param {string} [passsword]
            * @param {string} [icon]
            * @param {string} [description]
            * @memberof Group
         */
        constructor(guid: string, name?: string, type?: GroupType | string, passsword?: string, icon?: string, description?: string, hasJoined?: boolean);
        /**
            * Method to get GUID of the group.
            * @returns {string}
         */
        getGuid(): string;
        /**
            * Method to set GUID of the group.
            * @param {string} guid
         */
        setGuid(guid: string): void;
        /**
            * Method to get name of the group.
            * @returns {string}
         */
        getName(): string;
        /**
            * Method to set name of the group.
            * @param {string} name
         */
        setName(name: string): void;
        /**
            * Method to get the type of the group.
            * @returns {GroupType | string}
         */
        getType(): GroupType | string;
        /**
            * Method to set the type of the group.
            * @param {GroupType | string} type
         */
        setType(type: GroupType | string): void;
        /**
            * Method to get password of the group.
            * @returns {string}
         */
        getPassword(): string;
        /**
            * Method to set password of the group.
            * @param {string} password
         */
        setPassword(password: string): void;
        /**
            * Method to get icon of the group.
            * @returns {string}
         */
        getIcon(): string;
        /**
            * Method to set icon of the group.
            * @param {string} icon
         */
        setIcon(icon: string): void;
        /**
            * Method to get description of the group.
            * @returns {string}
         */
        getDescription(): string;
        /**
            * Method to set description of the group.
            * @param {string} description
         */
        setDescription(description: string): void;
        /**
            * Method to get owner of the group.
            * @returns {string}
         */
        getOwner(): string;
        /**
            * Method to set owner of the group.
            * @param {string} owner
         */
        setOwner(owner: string): void;
        /**
            * Method to get metadata of the group.
            * @returns {Object}
         */
        getMetadata(): Object;
        /**
            * Method to set metadata of the group.
            * @param {Object} metadata
         */
        setMetadata(metadata: Object): void;
        /**
            * Method to get the created at timestamp of the group.
            * @returns {number}
         */
        getCreatedAt(): number;
        /**
            * Method to set the created at timestamp of the group.
            * @param {number} createdAt
         */
        setCreatedAt(createdAt: number): void;
        /**
            * Method to get the updated at timestamp of the group.
            * @returns {number}
         */
        getUpdatedAt(): number;
        /**
            * Method to set updated at timestamp of the group.
            * @param {number} updatedAt
         */
        setUpdatedAt(updatedAt: number): void;
        /**
            * Method to get the joinedAt of the group.
            * @returns {boolean}
         */
        getHasJoined(): boolean;
        /**
            * Method to set the joinedAt of the group.
            * @param {boolean} hasJoined
         */
        setHasJoined(hasJoined: boolean): void;
        /** @private */
        getWsChannel(): any;
        /** @private */
        setWsChannel(wsChannel: any): void;
        /**
            * Method to set scope of the logged-in user in the group.
            * @param {string} scope
         */
        setScope(scope: string): void;
        /**
            * Method to get scope of the logged-in user.
            * @returns {string}
         */
        getScope(): string;
        /**
            * Method to get joinedAt timestamp of the logged-in user.
            * @returns {string}
         */
        getJoinedAt(): string;
        /**
            * Method to set joinedAt timestamp of the logged-in user in the group.
            * @param {string} joinedAt
         */
        setJoinedAt(joinedAt: string): void;
        /**
            * Method to get members count of the group.
            * @returns {number}
         */
        getMembersCount(): number;
        /**
            * Method to set members count of the group.
            * @param {number} membersCount
         */
        setMembersCount(membersCount: number): void;
        /**
            * Method to set tags of the group.
            * @param {string[]} tags
         */
        setTags(tags: Array<String>): void;
        /**
            * Method to get tags of the group.
            * @returns {string[]}
         */
        getTags(): Array<String>;
        /**
            * Method to check if the logged-in user is banned from the group or not.
            * @returns {boolean} status of the logged-in user as banned or not.
        */
        isBannedFromGroup(): boolean;
}

export class MessageListener {
        /**
            * This event is triggered when a text message is received.
         */
        onTextMessageReceived?: Function;
        /**
            * Offline: a batch of already-cached messages UPDATED while offline (edits, deletes, reactions,
            * receipts), reconciled by the catch-up sweep with `source == SYNC`. Upsert by id; never append.
         */
        onMessagesSynced?: Function;
        /**
            * This event is triggered when a media message is received.
         */
        onMediaMessageReceived?: Function;
        /**
            * This event is triggered when a custom message is received.
         */
        onCustomMessageReceived?: Function;
        /**
            * This event is triggered when someone start typing.
         */
        onTypingStarted?: Function;
        /**
            * This event is triggered when someone stops typing.
         */
        onTypingEnded?: Function;
        /**
            * This event is triggered when a message is delivered.
         */
        onMessagesDelivered?: Function;
        /**
            * This event is triggered when a message is read.
         */
        onMessagesRead?: Function;
        /**
            * This event is triggered when a message is edited.
         */
        onMessageEdited?: Function;
        /**
            * This event is triggered when a message is deleted.
         */
        onMessageDeleted?: Function;
        /**
            * This event is triggered when a transient message is received.
         */
        onTransientMessageReceived?: Function;
        /**
            * This event is triggered when a interactive message is received.
         */
        onInteractiveMessageReceived?: Function;
        /**
            * This event is triggered when a interaction goal is completd .
            */
        onInteractionGoalCompleted?: Function;
        /**
                 * This event is triggered when a reaction is added.
         */
        onMessageReactionAdded?: Function; /**
        /**
                 * This event is triggered when a reaction is removed.
         */
        onMessageReactionRemoved?: Function;
        /**
         * This event is triggered when a message is delivered to all members in a group.
        */
        onMessagesDeliveredToAll?: Function;
        /**
         * This event is triggered when a message is read by all members in a group.
        */
        onMessagesReadByAll?: Function;
        /**
            * This event is triggered when a message is moderated.
         */
        onMessageModerated?: Function;
        /**
         * This event is triggered when an AI tool result is received.
        */
        onAIToolResultReceived?: Function;
        /**
         * This event is triggered when an AI tool argument is received.
        */
        onAIToolArgumentsReceived?: Function;
        /**
         * This event is triggered when an AI assistant message is received.
        */
        onAIAssistantMessageReceived?: Function;
        /**
         * This event is triggered when a card message is received.
        */
        onCardMessageReceived?: Function;
        /**
         * This event is triggered when a message is pinned to a conversation.
         * Broadcast to everyone in the conversation except the device that pinned it, which
         * learns from the pinMessage() promise. Carries the full BaseMessage,
         * so getPinnedAt()/getPinnedBy() are readable without a further fetch.
        */
        onMessagePinned?: Function;
        /**
         * This event is triggered when a message is unpinned from a conversation.
         * Broadcast, except to the device that unpinned it (it learns from the unpinMessage()
         * promise). Carries the full BaseMessage, with the pin attrs cleared.
        */
        onMessageUnpinned?: Function;
        /**
         * This event is triggered when the logged-in user saves a message.
         * Private: it reaches only that user's OTHER devices, so a second device can sync
         * its bookmark. The device that made the call learns from the saveMessage() promise.
        */
        onMessageSaved?: Function;
        /**
         * This event is triggered when the logged-in user unsaves a message.
         * Private, same device fan-out as onMessageSaved.
        */
        onMessageUnsaved?: Function;
        constructor(...args: any[]);
}

export class CallListener {
        /**
            * This event is triggered when an incoming call is received.
         */
        onIncomingCallReceived?: Function;
        /**
            * This event is triggered when an outgoing call is accepted.
         */
        onOutgoingCallAccepted?: Function;
        /**
            * This event is triggered when an outgoing call is rejected.
         */
        onOutgoingCallRejected?: Function;
        /**
            * This event is triggered when an incoming call is cancelled.
         */
        onIncomingCallCancelled?: Function;
        /**
         * This event is triggered when call is ended.
        */
        onCallEndedMessageReceived?: Function;
        constructor(...args: any[]);
}
export class AIAssistantListener {
        /**
            * This event is triggered when an AI assistant event is received.
            * @param event - The AI assistant event that was received
            */
        onAIAssistantEventReceived?: (event: AIAssistantBaseEvent) => void;
        constructor(...args: any[]);
}
export class UserListener {
        /**
            * This event is triggered when a user comes online.
         */
        onUserOnline?: Function;
        /**
            * This event is triggered when a user goes offline.
         */
        onUserOffline?: Function;
        constructor(...args: any[]);
}
export class GroupListener {
        /**
            * This event is triggered when a user joins a group.
         */
        onGroupMemberJoined?: Function;
        /**
            * This event is triggered when a group member leaves the group.
         */
        onGroupMemberLeft?: Function;
        /**
            * This event is triggered when a group member is kicked from the group.
         */
        onGroupMemberKicked?: Function;
        /**
            * This event is triggered when a group member is banned from the group.
         */
        onGroupMemberBanned?: Function;
        /**
            * This event is triggered when a group member is unbanned from the group.
         */
        onGroupMemberUnbanned?: Function;
        /**
            * This event is triggered when scope of a group member is changed.
         */
        onGroupMemberScopeChanged?: Function;
        /**
            * This event is triggered when a user is added in the group.
         */
        onGroupMemberAddedToGroup: Function;
        constructor(...args: any[]);
}
export class OngoingCallListener {
        /**
            * @internal
         */
        onYouLeft?: Function;
        /**
            * @internal
         */
        onYouJoined?: Function;
        /**
            * This event is triggered when a user joins the call.
         */
        onUserJoined?: Function;
        /**
            * This event is triggered when a user leaves the call.
         */
        onUserLeft?: Function;
        /**
            * This event is triggered when the participant list of the call changes.
         */
        onUserListUpdated?: Function;
        /**
            * This event is triggered when an audio mode is updated.
         */
        onAudioModesUpdated?: Function;
        /**
            * This event is triggered when the call is ended.
         */
        onCallEnded?: Function;
        /**
            * This event is triggered when an error occurs.
         */
        onError?: Function;
        /**
         * This event is triggered when someone starts recording the call.
        */
        onRecordingStarted?: Function;
        /**
          * This event is triggered when someone stops recording the call.
        */
        onRecordingStopped?: Function;
        /**
          * This event is triggered when a user is muted.
         */
        onUserMuted?: Function;
        /**
          * This event is triggered when an audio call is switched to a video call.
        */
        onCallSwitchedToVideo?: Function;
        constructor(...args: any[]);
}
export class LoginListener {
        /**
            * This event is triggered when the user login is successful.
         */
        loginSuccess?: Function;
        /**
            * This event is triggered when the user login fails.
         */
        loginFailure?: Function;
        /**
            * This event is triggered when the user logout is successful.
         */
        logoutSuccess?: Function;
        /**
            * This event is triggered when the user logout fails.
         */
        logoutFailure?: Function;
        constructor(...args: any[]);
}
export class ConnectionListener {
        /**
            * This event is triggered when the WebSocket connection is in connected state.
         */
        onConnected?: Function;
        /**
            * This event is triggered when the WebSocket connection is in connecting state.
         */
        inConnecting?: Function;
        /**
            * This event is triggered when the WebSocket connection is in disconnected state.
         */
        onDisconnected?: Function;
        /**
         * This event is triggered when the WebSocket connection gets interrupted.
        */
        onConnectionError?: Function;
        /**
            * This event is triggered when the WebSocket connection is in feature throttled state.
         */
        onFeatureThrottled?: Function;
        constructor(...args: any[]);
}
/** @internal */
export interface EventListener {
        _name: string;
        _eventListener?: MessageListener | UserListener | OngoingCallListener | CallListener | GroupListener | LoginListener | ConnectionListener |AIAssistantListener;
}
/** @internal */
export class Listener implements EventListener {
        _name: string;
        _callback: Function;
        constructor(name: string, callback: Function);
}

/** @internal */
export class AssistantsListener extends Listener implements EventListener {
        _cursor?: number;
        _eventListener: AIAssistantListener;
        constructor(name: string, aiEventHandler?: AIAssistantListener, cursor?: number, callback?: Function);
}

/** @internal */
export class UserCallListener extends Listener implements EventListener {
        _cursor?: number;
        _eventListener: OngoingCallListener;
        constructor(callEventHandler?: OngoingCallListener, cursor?: number, callback?: Function);
}

/**
    *
    * @module Call
 */
export class Call extends BaseMessage implements Message {
        static readonly TYPE: {
                TEXT: string;
                MEDIA: string;
                IMAGE: string;
                VIDEO: string;
                AUDIO: string;
                FILE: string;
                CUSTOM: string;
                ASSISTANT: string;
                TOOL_RESULT: string;
                TOOL_ARGUMENTS: string;
        };
        static readonly RECEIVER_TYPE: {
                USER: string;
                GROUP: string;
        };
        static readonly CATEGORY: {
                MESSAGE: string;
                ACTION: string;
                CALL: string;
                CUSTOM: string;
                AGENTIC: string;
        };
        static readonly ACTION_TYPE: {
                TYPE_MEMBER_JOINED: string;
                TYPE_MEMBER_LEFT: string;
                TYPE_MEMBER_KICKED: string;
                TYPE_MEMBER_BANNED: string;
                TYPE_MEMBER_UNBANNED: string;
                TYPE_MEMBER_INVITED: string;
                TYPE_MEMBER_SCOPE_CHANGED: string;
                TYPE_MESSAGE: string;
                TYPE_MESSAGE_EDITED: string;
                TYPE_MESSAGE_DELETED: string;
                TYPE_MEMBER_ADDED: string;
        };
        protected metadata: any;
        protected action: string;
        protected rawData: string;
        protected initiatedAt: number;
        protected joinedAt: number;
        protected data: any;
        protected callInitiator: User;
        protected callReceiver: User | Group;
        /**
            * @memberof {@link CometChat | CometChat }
            * @param receiverId
            * @param type
            * @param receiverType
            * @param category
         */
        constructor(receiverId: any, type: any, receiverType: any, category?: any);
        /**
            * Get call initiator entity(User)
            * @returns {User}
         */
        getCallInitiator(): User;
        /**
            * @param {User} user
            * Set details of the call initiator.
         */
        setCallInitiator(user: User): void;
        /**
            * Get call receiver entity(User/Group)
            * @returns {User | Group}
         */
        getCallReceiver(): Group | User;
        /**
            * @param {User | Group} receiver
            * Set details of the call receiver.
         */
        setCallReceiver(receiver: User | Group): void;
        /** @internal */
        getData(): object;
        /** @internal */
        setData(data: object): void;
        /**
            * Get unique session id of the call message.
            * @returns {string}
         */
        getSessionId(): string;
        /**
            * @param {string} sessionId
            * Set unique session id of the call message.
         */
        setSessionId(sessionId: string): void;
        /**
            * Get JSONObject of data set by developer.
            * @returns
         */
        getMetadata(): any;
        /**
            * @param {any} metadata
            * Set metadata of the call message.
         */
        setMetadata(metadata: any): void;
        /**
            * Get sender of the message.
            * @returns {User}
         */
        getSender(): User;
        /**
            * Get action of call.
            * @returns {string}
         */
        getAction(): string;
        /**
            * @param {string} action
            * Set action of call.
         */
        setAction(action: string): void;
        /**
            * Get call initiated timestamp.
            * @returns {number}
         */
        getInitiatedAt(): number;
        /**
            * @param {number} initiatedAt
            * Set call initiated timestamp.
         */
        setInitiatedAt(initiatedAt: number): void;
        /**
            * Get call join timestamp.
            * @returns {number}
         */
        getJoinedAt(): number;
        /**
            * @param {number} joinedAt
            * Set call join timestamp.
         */
        setJoinedAt(joinedAt: number): void;
        /**
            * Get raw JSON data of the call message.
            * @returns {any}
         */
        getRawData(): any;
        /**
            * @param {any} rawData
            * Set raw JSON data of the call message.
         */
        setRawData(rawData: any): void;
        /**
            * @internal
            * @param {string} receiverUid
            * @param {string} text
            * @param {string} senderUid
            * @param {string} receiverType
            * @memberof Actions
         */
        static callFromJSON(rawMessage: any): Call | Message;
}

export class CallController {
        static getInstance(): CallController;
        /**
         * Method to mute/unmute audio stream.
         * @param {boolean} muteAudio 
        */
        muteAudio(muteAudio: boolean): void;

        /**
         * Method to pause/unpause video stream.
         * @param {boolean} pauseVideo 
        */
        pauseVideo(pauseVideo: boolean): void;

        /**
         * Method to set audio mode.
         * @param mode 
        */
        setAudioMode(mode: string): void;

        /**
         * Method to switch camera.
        */
        switchCamera(): void;

        /**
         * Method to get all the available audio output devices.
         * @returns {Promise<AudioMode[] | []>}
        */
        getAudioOutputModes(): Promise<AudioMode[] | []>;

        /**
         * Method to switch an audio call to video call.
        */
        switchToVideoCall(): void;

        /**
          * Method to Start Call Recording.
        */
        startRecording(): void;
 
        /**
         * Method to Stop Call Recording.
        */
        stopRecording(): void;
}

/**
    *
    * @module Action
 */
export class Action extends BaseMessage implements Message {
        static readonly TYPE: {
                TEXT: string;
                MEDIA: string;
                IMAGE: string;
                VIDEO: string;
                AUDIO: string;
                FILE: string;
                CUSTOM: string;
                ASSISTANT: string;
                TOOL_RESULT: string;
                TOOL_ARGUMENTS: string;
        };
        static readonly RECEIVER_TYPE: {
                USER: string;
                GROUP: string;
        };
        static readonly CATEGORY: {
                MESSAGE: string;
                ACTION: string;
                CALL: string;
                CUSTOM: string;
                AGENTIC: string;
        };
        static readonly ACTION_TYPE: {
                TYPE_MEMBER_JOINED: string;
                TYPE_MEMBER_LEFT: string;
                TYPE_MEMBER_KICKED: string;
                TYPE_MEMBER_BANNED: string;
                TYPE_MEMBER_UNBANNED: string;
                TYPE_MEMBER_INVITED: string;
                TYPE_MEMBER_SCOPE_CHANGED: string;
                TYPE_MESSAGE: string;
                TYPE_MESSAGE_EDITED: string;
                TYPE_MESSAGE_DELETED: string;
                TYPE_MEMBER_ADDED: string;
        };
        protected data?: any;
        protected actionBy: User | Group | BaseMessage;
        protected actionFor: User | Group | BaseMessage;
        protected actionOn: User | Group | BaseMessage;
        protected message: string;
        protected rawData: any;
        protected action: string;
        protected oldScope: string;
        protected newScope: string;
        /**
            * @internal
         */
        static actionFromJSON(rawMessage: any): Action | Message;
        /**
            * Method to get old scope of a member.
            * @returns {string}
         */
        getOldScope(): string;
        /**
            * @param {string} oldScope
            * Method to set old scope of a member.
         */
        setOldScope(oldScope: string): void;
        /**
            * Method to get new scope of a member.
            * @returns {string}
         */
        getNewScope(): string;
        /**
            * @param {string} newScope
            * Method to set new scope of a member.
         */
        setNewScope(newScope: string): void;
        /**
            * Method to get raw JSON data in string.
            * @returns {string}
         */
        getRawData(): any;
        /**
            * @param {any} rawData
            * Method to set raw JSON data.
         */
        setRawData(rawData: any): void;
        /**
            * Method to get the default action message.
            * @returns {string}
         */
        getMessage(): string;
        /**
            * @param {string} message
            * Method to set the default action message.
         */
        setMessage(message: string): void;
        /**
            * Method to get the action which is being performed.
            * @returns {string}
         */
        getAction(): string;
        /**
            * @param {string} action
            * Method to set the default action message.
         */
        setAction(action: string): void;
        /**
            * Method to get the sender of the action message.
            * @returns {string}
         */
        getSender(): User;
        /**
            * Method to get the entity which performed the action.
            * @returns {User | Group | BaseMessage}
         */
        getActionBy(): User | Group | BaseMessage;
        /**
            * @param {User | Group | BaseMessage} by
            * Method to set the entity which performed the action.
         */
        setActionBy(by: User | Group | BaseMessage): void;
        /**
            * Method to get the entity on which the action was performed.
            * @returns {User | Group | BaseMessage}
         */
        getActionOn(): User | Group | BaseMessage;
        /**
            * @param {User | Group | BaseMessage} on
            * Method to set the entity on which the action was performed.
         */
        setActionOn(on: User | Group | BaseMessage): void;
        /**
            * Method to get the entity for whom the action was performed.
            * @returns {User | Group | BaseMessage | any}
         */
        getActionFor(): User | Group | BaseMessage | any;
        /**
            * @param {User | Group | BaseMessage} for
            * Method to set the entity for whom the action was performed.
         */
        setActionFor(actionFor: User | Group | BaseMessage): void;
        /**
            * Method to get the metadata of the action message.
            * @returns {any}
         */
        getMetadata(): any;
        /**
            * @param {any} metadata
            * Method to get the metadata of the action message.
         */
        setMetadata(metadata: any): void;
}

export class GroupsRequest {
        constructor(builder?: GroupsRequestBuilder);
        /**
            * Get list of next set of groups based on the parameters specified in GroupsRequestBuilder class The Developer need to call this method repeatedly using the same object of GroupsRequest class to get paginated list of groups.
            * @returns {Promise<Group[] | []>}
         */
        fetchNext(listener?: GroupFetchListener): Promise<Group[] | []>;
        /**
            * Gets the limit on the number of groups to be fetched in a single operation.
            *
            * @return {number}
            */
        getLimit(): number;
        /**
            * Gets the search keyword used to filter the groups by their name or GUID.
            * Only groups whose names or GUIDs contain this keyword will be fetched.
            *
            * @return {string}
            */
        getSearchKeyword(): string;
        /**
            * Gets the flag indicating whether only the groups the user has joined should be fetched.
            *
            * @return {boolean}
            */
        isJoinedOnly(): any;
        /**
            * Gets the list of tags used to filter the groups.
            * Only groups associated with these tags will be fetched.
            *
            * @return {String[]}
            */
        getTags(): String[];
        /**
            * Gets the flag indicating whether tags should be included with the groups data.
            *
            * @return {boolean}
            */
        isWithTags(): boolean;
        /**
            * Get the current page number that the request is on.
            *
            * @return {number}
            */
        getPage(): number;
}
export class GroupsRequestBuilder {
        /** @private */ limit: number;
        /** @private */ searchKeyword: string;
        /** @private */ hasJoined: boolean;
        /** @private */ tags: Array<String>;
        /** @private */ showTags: boolean;
        /** @private */ page: number;
        /**
            *
            * @param {number} limit
            * A method to set limit for the number of Groups returned in a single iteration. A maximum of 100 groups can fetched in a single iteration.
            * @returns
         */
        setLimit(limit: number): this;
        /**
            *
            * @param {string} searchKeyword
            * A method to set the search string based on which the groups are to be fetched.
            * @returns
         */
        setSearchKeyword(searchKeyword: string): this;
        /**
            * A method to fetch only joined groups.
            * @param {boolean} hasJoined
            * @returns
         */
        joinedOnly(hasJoined: boolean): this;
        /**
            *
            * @param {string[]} tags
            * A method to set the tags based on which the groups are to be fetched.
            * @returns
         */
        setTags(tags: Array<String>): this;
        /**
            *
            * @param {boolean} withTags
            * A method to get the tags along with the other details of the groups.
            * @returns
         */
        withTags(withTags: boolean): this;
         /**
            *
            * @param {number} page
            * A method to set the page number to start fetching from. Page 0 will fetch the first page.
            * @returns
         */
        setPage(page: number): this;
        /**
            * This method will return an object of the GroupsRequest class.
            * @returns {GroupsRequest}
         */
        build(): GroupsRequest;
}


export class GroupMembersRequest {
    static USER_STATUS: {
        ONLINE: string;
        OFFLINE: string;
    };
        constructor(builder: GroupMembersRequestBuilder);
        /**
            * Get list of next set of group members based on the parameters specified in GroupMembersRequestBuilder class. The Developer need to call this method repeatedly using the same object of GroupMembersRequest class to get paginated list of group members.
            * @returns {Promise<GroupMember[] | []>}
         */
        fetchNext(listener?: GroupMemberFetchListener): Promise<GroupMember[] | []>;
        /**
            * Get the unique identifier of the group for which members are requested.
            *
            * @return {string}.
            */
        getGuid(): string;
        /**
            * Get the maximum number of group members to fetch in a single operation.
            *
            * @return {number}
            */
        getLimit(): number;
        /**
            * Gets the search keyword used to filter the group members by name or UID.
            *
            * @return {string}
            */
        getSearchKeyword(): string;
         /**
            * Gets the list of scopes used to filter banned group members based on specific criteria.
            * The scopes define the categories or roles of the group members to be fetched.
            *
            * @return {String[]}
            */
        getScopes(): String[];
        /**
            * Get the current page number that the request is on.
            *
            * @return {number}
            */
        getPage(): number;
          /**
            * Gets the status filter used to fetch members based on their online or offline status.
            *
            * @return {string}
        */
        getStatus(): string;
}
export class GroupMembersRequestBuilder {
        /** @private */ limit: number;
        /** @private */ searchKeyword: string;
        /** @private */ guid: string;
        /** @private */ scopes?: Array<String>;
         /** @private */ page: number;
        /** @private */ status: string;
        constructor(guid: string);
        /**
            *
            * @param {number} limit
            * A method to set limit for the number of group members returned in a single iteration. A maximum of 100 group members can fetched in a single iteration.
            * @returns
         */
        /**
            * Set the unique identifier of the group.
            *
            * @param guid The group ID to set.
            * @returns
            */
        setGuid(guid: string): this;
        setLimit(limit: number): this;
        /**
            *
            * @param {string} searchKeyword
            * A method to set the search string based on which the group members are to be fetched.
            * @returns
         */
        setSearchKeyword(searchKeyword: string): this;
        /**
            *
            * @param {string[]} scopes
            * A method to set the search group members based on their scope.
            * @returns
         */
        setScopes(scopes: Array<String>): this;
        /**
            *
            * @param {number} page
            * A method to set the page number to start fetching from. Page 0 will fetch the first page.
            * @returns
         */
        setPage(page: number): this;
           /**
            * A method to get the members belonging to a specific status.
            * @param {string} status
            * @returns
         */
        setStatus(status: string): this;
        /**
            * This method will return an object of the GroupMembersRequest class.
            * @returns {GroupMembersRequest}
         */
        build(): GroupMembersRequest;
        
}

export class BannedMembersRequest {
        constructor(builder: BannedMembersRequestBuilder);
        /**
            * Get list of next set of banned members based on the parameters specified in BannedMembersRequestBuilder class. The Developer need to call this method repeatedly using the same object of BannedMembersRequest class to get paginated list of banned members.
            * @returns {Promise<GroupMember[] | []>}
         */
        fetchNext(listener?: BannedGroupMemberFetchListener): Promise<GroupMember[] | []>;
        /**
            * Get the unique identifier of the group for which banned members are requested.
            *
            * @return {string}.
            */
        getGuid(): string;
        /**
            * Get the maximum number of banned group members to fetch in a single operation.
            *
            * @return {number}
            */
        getLimit(): number;
        /**
            * Get the search keyword used to filter banned group members.
            *
            * @return {string}
            */
        getSearchKeyword(): string;
        /**
        * Gets the list of scopes used to filter banned group members based on specific criteria.
        * The scopes define the categories or roles of the group members to be fetched.
        *
        * @return {String[]}
        */
        getScopes(): String[];
         /**
            * Get the current page number that the request is on.
            *
            * @return {number}
            */
        getPage(): number;
       
}
export class BannedMembersRequestBuilder {
        /** @private */ limit: number;
        /** @private */ searchKeyword: string;
        /** @private */ guid: string;
        /** @private */ scopes?: Array<String>;
        /** @private */ page: number;
        constructor(guid: string);
         /**
            * Set the unique identifier of the group.
            *
            * @param guid The group ID to set.
            * @returns
            */
         setGuid(guid: string): this;
        /**
            *
            * @param {number} limit
            * A method to set limit for the number of banned members returned in a single iteration. A maximum of 100 banned members can fetched in a single iteration.
            * @returns
         */
        setLimit(limit: number): this;
        /**
            *
            * @param {string} searchKeyword
            * A method to set the search string based on which the banned members are to be fetched.
            * @returns
         */
        setSearchKeyword(searchKeyword: string): this;
        /**
            *
            * @param {string[]} scopes
            * A method to set the search banned members based on their scope.
            * @returns
         */
        setScopes(scopes: Array<String>): this;
         /**
            *
            * @param {number} page
            * A method to set the page number to start fetching from. Page 0 will fetch the first page.
            * @returns
         */
        setPage(page: number): this;
        /**
            * This method will return an object of the BannedMembersRequest class.
            * @returns {BannedMembersRequest}
         */
        build(): BannedMembersRequest;
}   
export class UsersRequest {
        static USER_STATUS: {
                ONLINE: string;
                OFFLINE: string;
        };
        constructor(builder?: UsersRequestBuilder);
        /**
            * Gets the limit on the number of users to be fetched.
            *
            * @return {number}
            */
        getLimit(): number;
        /**
            * Gets the search keyword used to filter the users list.
            * This keyword is used to search for users based on their name or UID.
            *
            * @return {string}
            */
        getSearchKeyword(): string;
        /**
            * Determines whether blocked users are excluded from the users list.
            *
            * @return {boolean}
            */
        isHideBlockedUsers(): boolean;
        /**
            * Gets the status filter used to fetch users based on their online or offline status.
            *
            * @return {string}
            */
        getStatus(): string;
        /**
            * Gets the user role filter used to fetch users based on their role.
            *
            * @return {string}
            */
        getRole(): string;
        /**
            * Determines whether only friends are included in the users list.
            *
            * @return {boolean}
            */
        isFriendsOnly(): boolean;
        /**
            * Gets the list of roles used to filter users.
            * Users will be fetched based on the specified roles.
            *
            * @return {String[]}
            */
        getRoles(): String[];
        /**
            * Gets the list of tags used to filter users.
            * Users will be fetched based on the specified tags.
            *
            * @return {String[]}
            */
        getTags(): String[];
        /**
            * Determines whether the tags are included in the users data when fetched.
            *
            * @return {boolean}
            */
        isWithTags(): boolean;
        /**
            * Gets the list of UIDs used to fetch specific users.
            *
            * @return {}
            */
        getUIDs(): String[];
        /**
            * Gets the fields specified to search for the search keyword in the user data.
            * Possible fields are "name" and "uid".
            *
            * @return {String[]}
            */
        getSearchIn(): String[];
        /**
            * Gets the field by which the user list is sorted.
            * Possible values are "status" or "name".
            *
            * @return {string}
            */
        getSortBy(): string;
        /**
            * Gets the order in which the user list is sorted.
            * Possible values are "asc" for ascending order and "desc" for descending order.
            *
            * @return {string}
            */
        getSortOrder(): string;
         /**
            * Get the current page number that the request is on.
            *
            * @return {number}
            */
        getPage(): number;
        /**
            * Get list of next set of users based on the parameters specified in UsersRequestBuilder class The Developer need to call this method repeatedly using the same object of UsersRequestBuilder class to get paginated list of users.
            * @returns {Promise<User[] | []>}
         */
        fetchNext(listener?: UserFetchListener): Promise<User[] | []>;
}
export class UsersRequestBuilder {
        /** @private */ limit: number;
        /** @private */ status: string;
        /** @private */ searchKeyword: string;
        /** @private */ shouldHideBlockedUsers: boolean;
        /** @private */ role: string;
        /** @private */ roles: Array<String>;
        /** @private */ tags: Array<String>;
        /** @private */ showFriendsOnly: boolean;
        /** @private */ showTags: boolean;
        /** @private */ UIDs: Array<String>;
        /** @private */ SortBy: string;
        /** @private */ SortOrder: string;
        /** @private */ SearchIn: Array<String>;
        /** @private */ page: number;
        /**
            * A method to set limit for the number of Users returned in a single iteration. A maximum of 100 users can fetched in a single iteration.
            * @param {number} limit
            * @returns
         */
        setLimit(limit: number): this;
        /**
            * A method to get the users belonging to a specific status.
            * @param {string} status
            * @returns
         */
        setStatus(status: string): this;
        /**
            * A method to set the search string based on which the users are to be fetched.
            * @param {string} searchKeyword
            * @returns
         */
        setSearchKeyword(searchKeyword: string): this;
        /**
            * Method to hide blocked users.
            * @param {boolean} hideBlockedUsers
            * @returns
         */
        hideBlockedUsers(hideBlockedUsers: boolean): this;
        /**
            * A method to get the users with the specified role.
            * @param {string} role
            * @returns
         */
        setRole(role: string): this;
        /**
            * A method to get the users with the specified roles.
            * @param {string[]} role
            * @returns
         */
        setRoles(roles: Array<String>): this;
        /**
            * A method to fetch only friends.
            * @param {boolean} friendsOnly
            * @returns
         */
        friendsOnly(friendsOnly: boolean): this;
        /**
            * A method to get the users with the specified tags.
            * @param {string[]} tags
            * @returns
         */
        setTags(tags: Array<String>): this;
        /**
            * A method to get the tags along with the other details of the users.
            * @param {boolean} withTags
            * @returns
         */
        withTags(withTags: boolean): this;
        /**
            * A method to get the users with the specified UIDs.
            * @param {string[]} uids
            * @returns
         */
        setUIDs(uids: Array<String>): this;
        /**
         * A method to get the users sorted by either `name` or `status`. 
         * It accepts a string as input.
         * By default the SDK fetches users sorted by `status`.
         * @param {string} sortBy 
         * @returns 
        */
        public sortBy(sortBy: string): this;
        /**
         * A method to get the users sorted either in `asc` or `desc` order.  
         * It accepts a string as input.
         * By default the SDK fetches users sorted in `asc` order.
         * @param {string} sortOrder 
         * @returns 
        */
        public sortByOrder(sortOrder: string): this;
        /**
         * A method to set which field the search string should be searched. 
         * It accepts an array of string as input.
         * It can be `["name"]`, `["uid"]` or `["name", "uid"]`.
         * By default the SDK searches the search string in `["name", "uid"]`.
         * @param {string[]} searchIn 
         * @returns 
        */
        public searchIn(searchIn: Array<String>): this;
        /**
            * A method to set the page number to start fetching from. Page 0 will fetch the first page.
            * @param {number} page
            * @returns
         */
        setPage(page: number): this;
        /**
            * This method will return an object of the UsersRequest class.
            * @returns {UsersRequest}
         */
        build(): UsersRequest;
}

export class ConversationsRequest {
        /**
            * @private
            * @param {ConversationsRequestBuilder} builder
         */
        constructor(builder?: ConversationsRequestBuilder);
        /**
            * Get list of next set of conversations based on the parameters specified in ConversationsRequestBuilder class. The Developer need to call this method repeatedly using the same object of ConversationsRequest class to get paginated list of conversations.
            * Offline: additive two-phase read — onCachedConversations (instant, from the local cache; may be empty) then onServerConversations (authoritative). Passing a listener STILL returns the Promise (resolves with the server page, rejects on error / offline); with offline off, only onServerConversations fires.
            * @returns {Promise<Conversation[] | []>}
        */
        fetchNext(listener?: ConversationFetchListener): Promise<Conversation[] | []>;
        /**
            * Checks if blocked users are to be included in the list of conversations.
            * @returns {boolean}
        */
        isIncludeBlockedUsers(): boolean;
        /**
            * Checks if blocked information should be included in the list of conversations.
            * @returns {boolean}
        */
        isWithBlockedInfo(): boolean;
        /**
            * Gets the limit for the number of items to be fetched or processed.
            * @returns {number}
        */
        getLimit(): number;
        /**
            * Retrieves the type of the conversation.
            * This can be used to differentiate between different types of conversations, such as user and group.
            * @returns {string}
        */
        getConversationType(): string;
        /**
            * Checks if the filtering should include both user and group tags.
            * @return true if both user and group tags are included. false otherwise.
            * @returns {boolean}
        */
        isWithUserAndGroupTags(): boolean;
        /**
            * Gets the list of tags associated with the conversation item.
            * These tags can be used for categorization or filtering.
            * @returns {String[]}
        */
        getTags(): String[];
        /**
            * Determines whether the filtering or selection process should consider tags.
            *
            * @returns {boolean}
        */
        isWithTags(): boolean;
        /**
            * Retrieves the list of group-specific tags.
            * These tags are used to filter and fetch conversations that are associated with groups tagged with these specified tags.
            * @returns {String[]}
        */
        getGroupTags(): String[];
        /**
            * Retrieves the list of user-specific tags.
            * These tags are used to filter and fetch conversations that are associated with users tagged with these specified tags.
            * @returns {String[]}
        */
        getUserTags(): String[];
        /**
            * Method to get the search string based on which the conversations will be fetched.
            * @returns {string}
         */
        getSearchKeyword(): string;
        /**
            * Get the current page number that the request is on.
            *
            * @return {number}
            */
        getPage(): number;
        
        /**
            * Determines whether only unread conversations should be fetched.
            *
            * @returns {boolean}
         */
        getUnread(): boolean;
        /**
            * Determines whether agentic conversations should be hidden.
            *
            * @returns {boolean}
         */
        getHideAgentic(): boolean;
        /**
            * Determines whether only agentic conversations should be fetched.
            *
            * @returns {boolean}
         */
        getOnlyAgentic(): boolean;
}
export class ConversationsRequestBuilder {
        /** @private */ conversationType: string;
        /** @private */ limit: number;
        /** @private */ getUserAndGroupTags: boolean;
        /** @private */ tags: Array<String>;
        /** @private */ WithTags: boolean;
        /** @private */ groupTags: Array<String>;
        /** @private */ userTags: Array<String>;
        /** @private */ IncludeBlockedUsers: boolean;
        /** @private */ WithBlockedInfo: boolean;
        /** @private */ searchKeyword: string;
        /** @private */ unreadOnly: boolean;
        /** @private */ hideAgentic: boolean;
        /** @private */ onlyAgentic: boolean;
         /** @private */ page: number;
        /**
            *
            * @param {number} limit
            * A method to set limit for the number of Conversations returned in a single iteration. A maximum of 50 conversations can fetched in a single iteration.
            * @returns
         */
        setLimit(limit: number): this;
        /**
            *
            * @param {string} conversationType
            * A method to set the conversation type. It can take once of the two values: 1. 'user' - to fetch only the user conversations. 2. 'group' - to fetch only the group conversations.
            * @returns
         */
        setConversationType(conversationType: string): this;
        /**
            *
            * @param {string} searchKeyword
            * Method to set the search string based on which the conversations will be fetched.
            * This string will be searched in the `conversationWith` property.
            * @returns
         */
        setSearchKeyword(searchKeyword: string): this;
        /**
            *
            * @param {boolean} getUserAndGroupTags
            * A method to fetch the user/group tags in the ConversationWith Object. The default value is false.
            * @returns
         */
        withUserAndGroupTags(getUserAndGroupTags: boolean): this;
        /**
         * A method to get the tags along with conversations.
         * @param {boolean} withTags 
         * @returns 
        */
        withTags(withTags: boolean): this;
        /**
         * A method to get conversations with the specified tags.
         * @param {Array<String>} tags 
         * @returns 
        */
        setTags(tags: Array<String>): this;
        /**
         * A method to filter conversation list by group tags.
         * @param {Array<String>} groupTags 
         * @returns 
        */
        public setGroupTags(groupTags: Array<String>): this;
        /**
         * A method to filter conversation list by user tags.
         * @param {Array<String>} userTags 
         * @returns 
        */
        public setUserTags(userTags: Array<String>): this;
        /**
            * A method to include blocked users in the list of conversations.
            * @param {boolean} _includeBlockedUsers
            * @returns
            * @deprecated This method is deprecated as of version 4.0.10 due to newer method 'includeBlockedUsers'.
            * It will be removed in subsequent versions.
        */
        public setIncludeBlockedUsers(_includeBlockedUsers: boolean): this;

        /**
            * A method to include blocked users in the list of conversations.
            * @param {boolean} _includeBlockedUsers
            * @returns
        */
        public includeBlockedUsers(_includeBlockedUsers: boolean): this;

        /**
            * A method to include blocked users information in the list of conversations.
            * @param {boolean} _withBlockedInfo
            * @returns
            * @deprecated This method is deprecated as of version 4.0.10 due to newer method 'withBlockedInfo'.
            * It will be removed in subsequent versions.
        */
        public setWithBlockedInfo(_withBlockedInfo: boolean): this;
        /**
            * A method to include blocked users information in the list of conversations.
            * @param {boolean} _withBlockedInfo
            * @returns
        */
        public withBlockedInfo(_withBlockedInfo: boolean): this;
         /**
            * A method to fetch unread conversations.
            * @param {boolean} unread
            * @returns
         */
         setUnread(unread: boolean): this;
          /**
            * A method to set the page number to start fetching from. Page 0 will fetch the first page.
            * @param {number} page
            * @returns
         */
        setPage(page: number): this;
        /**
            * Restrict the list to pinned conversations only.
            *
            * Accepts "system" (admin/global pins), "me" (this user's own), or both.
            * Any other value is ERR_BAD_REQUEST server-side, so invalid entries are
            * dropped client-side rather than turned into a 400 — end users cannot
            * query another user's pins.
            *
            * Usually unnecessary: the DEFAULT conversation list already carries
            * pinnedBy/pinnedAt on each row and already sorts pinned rows on top, so
            * a pinned strip needs no separate call. Use this only when the pinned
            * set is wanted standalone.
            * @param {Array<string>} pinnedBy
            * @returns
         */
        setPinnedBy(pinnedBy: Array<string>): this;
        /**
            * A method to hide agentic conversations from the list.
            * @param {boolean} hideAgentic
            * @returns
         */
        setHideAgentic(hideAgentic: boolean): this;
        /**
            * A method to fetch only agentic conversations.
            * @param {boolean} onlyAgentic
            * @returns
         */
        setOnlyAgentic(onlyAgentic: boolean): this;
        /**
            * This method will return an object of the ConversationsRequest class.
            * @returns {ConversationsRequest}
         */
        build(): ConversationsRequest;
}


export class MessagesRequest {
        constructor(builder?: MessagesRequestBuilder);
        /**
            * Gets the limit on the number of messages to be fetched in a single operation.
            *
            * @return {number}
            */
        getLimit(): number;
        /**
            * Gets the UID of the user for which the messages are being fetched.
            *
            * @return {string}.
            */
        getUID(): string;
        /**
            * Gets the GUID of the group for which the messages are being fetched.
            *
            * @return {guid}
            */
        getGUID(): string;
        /**
            * Gets the message ID from which subsequent or previous messages are to be fetched.
            *
            * @return {number}
            */
        getMessageId(): number;
        /**
            * Gets the flag indicating whether to fetch only unread messages.
            *
            * @return {boolean}
            */
        isUnread(): boolean;
        /**
            * Gets the flag indicating whether to hide messages from blocked users.
            *
            * @return {boolean}
            */
        isHideMessagesFromBlockedUsers(): boolean;
        /**
            * Gets the timestamp from which messages are to be fetched.
            * Used to fetch messages around a specific time point.
            *
            * @return {number}
            */
        getTimestamp(): number;
        /**
            * Gets the search keyword used to filter messages.
            * Only messages containing this keyword will be fetched.
            *
            * @return {string}
            */
        getSearchKeyword(): string;
        /**
            * Gets the timestamp after which updated or edited messages are to be fetched.
            *
            * @return {string}
            */
        getUpdatedAfter(): string;
        /**
            * Gets the flag indicating whether to fetch only updated or edited messages.
            *
            * @return {boolean}
            */
        isUpdatesOnly(): any;
        /**
            * Gets the list of categories for which the messages are to be fetched.
            *
            * @return {String[]}
            */
        getCategories(): String[];
        /**
            * Gets the category for which the messages are to be fetched.
            *
            * @return {string}
            */
        getCategory(): string;
        /**
            * Gets the list of types for which the messages are to be fetched.
            *
            * @return {String[]}
            */
        getTypes(): String[];
        /**
            * Gets the type for which the messages are to be fetched.
            *
            * @return {string}
            */
        getType(): string;
        /**
            * Gets the parent message ID to fetch messages belonging to a specific thread.
            *
            * @return {number}
            */
        getParentMessageId(): number;
        /**
            * Gets the flag indicating whether to exclude replies (threaded messages) when fetching messages.
            *
            * @return {boolean}
            */
        isHideReplies(): boolean;
        /**
            * Gets the flag indicating whether to hide deleted messages when fetching messages.
            *
            * @return {boolean}
            */
        isHideDeletedMessages(): boolean;
        /**
            * Gets the flag indicating whether to only fetch messages which have attachments.
            *
            * @return {boolean}
            */
        getHasAttachments(): boolean;
        /**
            * Method to only fetch messages which have links.
            *
            * @return {boolean}
            */
        getHasLinks(): boolean;
        /**
         * Method to only fetch messages which have mentions.
         *
         * @return {boolean}
         */
        getHasMentions(): boolean;
        /**
         * Method to only fetch messages which have reactions.
         *
         * @return {boolean}
         */
        getHasReactions(): boolean;
        /**
         * Method to only fetch messages which have the given mentioned UIDs.
         *
         * @return {String[]}
         */
        getMentionedUIDs(): String[];
        /**
            * Gets the list of tags for which the messages are to be fetched.
            *
            * @return {String[]}
            */
        getTags(): String[];
        /**
            * Gets the flag indicating whether messages should be fetched with their tags.
            *
            * @return {boolean}
            */
        isWithTags(): boolean;
        /**
            * Gets the flag indicating whether to fetch mentioned messages with user tag information.
            *
            * @return {boolean}
            */
        isMentionsWithTagInfo(): boolean;
        /**
            * Gets the flag indicating whether to fetch mentioned messages with blocked relation information.
            *
            * @return {boolean}
            */
        isMentionsWithBlockedInfo(): boolean;
        /**
            * Gets the flag indicating whether to fetch only messages with completed interaction goals.
            *
            * @return {boolean}
            */
        isInteractionGoalCompletedOnly(): boolean;
        /**
            * Returns the list of selected attachment types used for filtering messages.
            * @return {Array<AttachmentTypes>}
         */
        getAttachmentTypes(): Array<AttachmentType>;
         /**
            * Gets the flag indicating whether to fetch messages with parent message information.
         */
        isWithParent(): boolean;
        /**
            * Gets the flag indicating whether to hide quoted messages when fetching messages.
            *
            * @return {boolean}
        */
        isHideQuotedMessages(): boolean;
        /**
            * Get list of next messages based on the parameters specified in MessagesRequestBuilder class. The Developer need to call this method repeatedly using the same object of MessagesRequest class to get paginated list of message.
            * Offline: additive two-phase read — onCachedMessages (instant, from the local cache; may be empty) then onServerMessages (authoritative). Passing a listener STILL returns the Promise (resolves with the server page, rejects on error / offline); with offline off, only onServerMessages fires.
            * @returns {Promise<BaseMessage[] | []>}
        */
        fetchNext(listener?: MessageFetchListener): Promise<BaseMessage[] | []>;
        /**
            * Get list of previous messages based on the parameters specified in MessagesRequestBuilder class. The Developer need to call this method repeatedly using the same object of MessagesRequest class to get paginated list of message.
            * Offline: additive two-phase read — onCachedMessages (instant, from the local cache; may be empty) then onServerMessages (authoritative). Passing a listener STILL returns the Promise (resolves with the server page, rejects on error / offline); with offline off, only onServerMessages fires.
            * @returns {Promise<BaseMessage[] | []>}
        */
        fetchPrevious(listener?: MessageFetchListener): Promise<BaseMessage[] | []>;
}
export class MessagesRequestBuilder {
        /** @private */ limit?: number;
        /** @private */ maxLimit: number;
        /** @private */ uid?: string;
        /** @private */ guid?: string;
        /** @private */ parentMessageId?: number;
        /** @private */ timestamp?: number;
        /** @private */ id?: number;
        /** @private */ unread?: boolean;
        /** @private */ HideMessagesFromBlockedUsers?: boolean;
        /** @private */ searchKey?: string;
        /** @private */ updatedAt?: string;
        /** @private */ onlyUpdate?: number;
        /** @private */ category?: string;
        /** @private */ categories?: Array<String>;
        /** @private */ type?: string;
        /** @private */ types?: Array<String>;
        /** @private */ HideReplies?: boolean;
        /** @private */ HideDeletedMessages?: boolean;
        /** @private */ tags?: Array<String>;
        /** @private */ WithTags?: boolean;
        /** @private */ interactionGoalCompletedOnly?: boolean;
        /** @private */ mentionsWithUserTags?: boolean;
        /** @private */ mentionsWithBlockedRelation?: boolean; 
        /** @private */ HasAttachments?: boolean;
        /** @private */ HasLinks?: boolean;
        /** @private */ HasMentions?: boolean;
        /** @private */ HasReactions?: boolean;
        /** @private */ mentionedUIDs?: Array<String>;      
        /** @private */ HideQuotedMessages?: boolean;   
        /** @private */ attachmentTypes?: Array<AttachmentType>; 
        /** @private */ WithParent?: boolean;  
        /**
            * A method to set limit for the number of messages returned in a single iteration. A maximum of 100 messages can fetched in a single iteration.
            * @param {number} limit
            * @returns
         */
        setLimit(limit: number): this;
        /**
            * A method to set GUID of a Group to get messages of that particular group conversation.
            * @param {string} guid
            * @returns
         */
        setGUID(guid: string): this;
        /**
            * A method to set UID of a User to get messages of that particular user conversation.
            * @param {string} uid
            * @returns
         */
        setUID(uid: string): this;
        /**
            * A method to set parent message id to get messages of that particular thread.
            * @param {number} parentMessageId
            * @returns
         */
        setParentMessageId(parentMessageId: number): this;
        /**
            * A method to set timestamp to get messages before/after the specified timestamp.
            * @param {number} timestamp
            * @returns
         */
        setTimestamp(timestamp?: number): this;
        /**
            * A method to set message ID of a particular message to get messages before/after the specified message.
            * @param {number} id
            * @returns
         */
        setMessageId(id?: number): this;
        /**
            * A method to get only unread messages.
            * @param {boolean} unread
            * @returns
         */
        setUnread(unread?: boolean): this;
        /**
            * Method to set parameters to hide or show message from blocked users.
            * @param {boolean} hideMessagesFromBlockedUsers
            * @returns
         */
        hideMessagesFromBlockedUsers(hideMessagesFromBlockedUsers?: boolean): this;
        /**
            * A method to set the search string based on which the messages are to be fetched.
            * @param {string} searchKey
            * @returns
         */
        setSearchKeyword(searchKey: string): this;
        /**
            * A method set timestamp to get fetch messages updated/edited after that timestamp.
            * @param {string} updatedAt
            * @returns
         */
        setUpdatedAfter(updatedAt: string): this;
        /**
            * A method to get only edited/updated messages.
            * @param {boolean} onlyUpdate
            * @returns
         */
        updatesOnly(onlyUpdate: boolean): this;
        /**
            * A method to set parameter to get the messages belonging to a specific category.
            * @param {string} category
            * @returns
         */
        setCategory(category: string): this;
        /**
            * A method to set parameter to get the messages belonging to specific categories.
            * @param {string[]} categories
            * @returns
         */
        setCategories(categories: Array<String>): this;
        /**
            * A method to set parameter to get the messages belonging to a specific type.
            * @param {string} type
            * @returns
         */
        setType(type: string): this;
        /**
            * A method to set parameter to get the messages belonging to specific types.
            * @param {string[]} types
            * @returns
         */
        setTypes(types: Array<String>): this;
        /**
            * A method to hide message replies.
            * @param {boolean} hideReplies
            * @returns
         */
        hideReplies(hideReplies: boolean): this;
        /**
            * A method to hide deleted messages.
            * @param {boolean} hideDeletedMessages
            * @returns
         */
        hideDeletedMessages(hideDeletedMessages: boolean): this;
        /**
            * Method to only fetch messages which have attachments.
            * @param {boolean} hasAttachments
            * @returns
         */
        hasAttachments(hasAttachments: boolean): this;
        /**
            * Method to only fetch messages which have links.
            * @param {boolean} hasLinks
            * @returns
         */
        hasLinks(hasLinks: boolean): this;
        /**
            * Method to only fetch messages which have mentions.
            * @param {boolean} hasMentions
            * @returns
         */
        hasMentions(hasMentions: boolean): this; this;
        /**
            *Method to only fetch messages which have reactions.
            * @param {boolean} hasReactions
            * @returns
         */
        hasReactions(hasReactions: boolean): this;
        /**
            * Method to only fetch messages which have the given mentioned UIDs.
            * @param {Array<String>} mentionedUIDs
            * @returns
         */
        setMentionedUIDs(mentionedUIDs: Array<String>): this;
        /**
         * A method to set parameter to get the messages belonging to specific tags.
         * @param {Array<String>} tags 
         * @returns 
        */
        setTags(tags: Array<String>): this;
        /**
         * A method to get messages with tags.
         * @param {boolean} withTags 
         * @returns 
        */
        withTags(withTags: boolean): this;
        /**
            * A method to include the user tags  when getting the list of message with mentions
            * @param {boolean} mentionsWithUserTags
            * @returns
         */
        mentionsWithTagInfo(mentionsWithUserTags?: boolean): this;
        /**
            * A method to include the blocked relation when getting the list of message with mentions
            * @param {boolean} mentionsWithBlockedRelation
            * @returns
         */
        mentionsWithBlockedInfo(mentionsWithBlockedRelation?: boolean): this;
        /**
            * A method to get only interacted messages.
            * @param {boolean} interactionGoalCompletedOnly
            * @returns
         */
        setInteractionGoalCompletedOnly(interactionGoalCompletedOnly?: boolean): this;
        /**
            * Filters messages by specific attachment types.
            * @param {Array<AttachmentTyes>} attachmentTypes
            * @returns
         */
        setAttachmentTypes(attachmentTypes: Array<AttachmentType>): this;
         /**
            * A method to hide quoted messages.
            * @param {boolean} hideQuotedMessages
            * @returns
         */
        hideQuotedMessages(hideQuotedMessages: boolean): this;
        /**
            * This method will return an object of the MessagesRequest class.
            * @returns {MessagesRequest}
         */
        /**
            * This method will set the flag indicating whether to fetch messages with parent message information.
            * @param {boolean} withParent
            * @returns {this}
         */
        withParent(withParent?: boolean): this;
        /**
            * Restrict the result to messages PINNED in this conversation, newest pin
            * first. Requires setUID() or setGUID().
            *
            * Paged by the ordinary cursor, via fetchPrevious() for older rows and
            * fetchNext() for newer, ending when a call resolves []. The one difference
            * is the field the cursor rides on: a pinned list is ordered by `pinnedAt`,
            * not `sentAt`, and the SDK swaps it for you.
            *
            * @param {boolean} pinnedOnly
            * @returns {MessagesRequestBuilder}
         */
        setPinnedOnly(pinnedOnly?: boolean): this;
        /**
            * Restrict the result to messages the LOGGED-IN USER has saved, newest
            * save first. Account-wide and private: do NOT combine with
            * setUID()/setGUID(), which would scope it to a single conversation.
            *
            * Paged by the ordinary sentAt cursor, via fetchPrevious()/fetchNext() —
            * this filter changes what the list contains, not how it pages.
            *
            * @param {boolean} savedOnly
            * @returns {MessagesRequestBuilder}
         */
        setSavedOnly(savedOnly?: boolean): this;
        build(): MessagesRequest;
}

/**
    *
    * @module TypingIndicator
 */
export class TypingIndicator {
        constructor(receiverId?: string, receiverType?: string, meta?: any);
        /**
            * Method to get receiver type of the transient message.
            * @returns {string}
         */
        getReceiverType(): string;
        /**
            * Method to set receiver type of the transient message.
            * @param {string} receiverType
         */
        setReceiverType(receiverType: string): void;
        /**
            * Method to get receiverID of typing indicator.
            * @returns {string}
         */
        getReceiverId(): string;
        /**
            * Method to set receiverID of typing indicator.
            * @param {string} receiverId
         */
        setReceiverId(receiverId: string): void;
        /**
            * Method to get metadata of the transient message.
            * @returns {Object}
         */
        getMetadata(): Object;
        /**
            * Method to set metadata of the transient message.
            * @param {Object} meta
         */
        setMetadata(meta: Object): void;
        /**
            * Method to get sender of the transient message.
            * @returns {User}
         */
        getSender(): User;
        /**
            * Method to set sender of the transient message.
            * @param {User} sender
         */
        setSender(sender: User): void;
}

/**
    *
    * @module CustomMessage
 */
export class CustomMessage extends BaseMessage implements Message {
        private customData;
        private subType;    
        protected data?;
        private tags?;
        constructor(...args: any[]);
        /**
            * Retrieves the preview text for a custom message to be displayed in the Conversation List.
            * This method allows for a textual representation of the custom message that can be used
            * as a conversation snippet or preview, enhancing the user experience by providing context.
            * @returns {string} The text to display as the conversation preview.
        */
        getConversationText(): string;
        /**
            * Sets the preview text for a custom message to be displayed in the Conversation List.
            * This method allows for a textual representation of the custom message that can be used
            * as a conversation snippet or preview, enhancing the user experience by providing context.
            * @param {string} text The text to set as the conversation preview.
        */
        setConversationText(text: string): void;
        /**
            * Determines whether the custom message should be considered as the last message
            * in the conversation, potentially changing the order of conversations.
            * This method indicates if sending a custom message will update the conversation's last message,
            * which may affect the conversation's position in the list based on the sorting order.
            * @returns {boolean} A boolean value indicating whether sending the custom message triggers an update
            * to the last message of the conversation, potentially altering the conversation order.
        */
        willUpdateConversation(): boolean;
        /**
            * Set the flag to determine if the conversation should be updated. 
            * @param {boolean} updateConversation The flag to set if the conversation should be updated.
        */
        shouldUpdateConversation(updateConversation: boolean): void;
        /**
            * Determines whether a push notification should be sent for the custom message.
            * This method checks if the current custom message configuration specifies that a push notification
            * is warranted when the message is sent.
            * @returns {boolean} A boolean value indicating whether to send a push notification for the custom message.
        */
        willSendNotification(): boolean;
        /**
            * Set the flag to determine if a notification should be sent.
            * @param {boolean} sendNotification The flag to set if a notification should be sent.
        */
        shouldSendNotification(sendNotification: boolean): void;
        /**
            * Method to get custom data of the message.
            * @returns {Object}
         */
        getCustomData(): Object;
        /**
            * Method to set custom data of the message.
            * @param {Object} customData
         */
        setCustomData(customData: Object): void;
        /**
            * Method to get sender of the message.
            * @returns {User}
         */
        getSender(): User;
        /**
            * Method to get receiver of the message.
            * @returns {User | Group}
         */
        getReceiver(): User | Group;
        /**
            * Methhod to get sub type of the message.
            * @returns {string}
         */
        getSubType(): string;
        /**
            * Method to set sub type of the message.
            * @param {string} subType
         */
        setSubType(subType: string): void;
        /**
            * Method to get metadata of the message.
            * @returns {Object}
         */
        getMetadata(): Object;
        /**
            * Method to set metadata of the message.
            * @param {Object} metadata
         */
        setMetadata(metadata: Object): void;
        /**
            * Method to get data of the message.
            * @returns
         */
        getData(): any;
        /**
         * Get the tags of the message.
         * @returns {Array<String>}
         */
        getTags(): Array<String>;
        /**
          * @param {Array<String>} tags
          * Set the tags for the message.
          */
        setTags(tags: Array<String>): void;
}

/**
    *
    * @module GroupMember
 */
export class GroupMember extends User {
        constructor(uid: string, scope?: string);
        /**
            * Method to set scope of the group member.
            * @param {GroupMemberScope} scope
         */
        setScope(scope: GroupMemberScope): void;
        /**
            * Method to set joinedAt of the group member.
            * @param {number} joinedAt
         */
        setJoinedAt(joinedAt: number): void;
        /**
            * Method to set guid of the group member.
            * @param {string} guid
         */
        setGuid(guid: string): void;
        /**
            * Method to get scope of the group member.
            * @returns {string}
         */
        getScope(): string;
        /**
            * Method to get joinedAt of the group member.
            * @returns {number}
         */
        getJoinedAt(): number;
        /**
            * Method to get guid of the group member.
            * @returns {string}
         */
        getGuid(): string;
}


export class BlockedUsersRequest {
        static directions: {
                BOTH: string;
                HAS_BLOCKED_ME: string;
                BLOCKED_BY_ME: string;
        };
        /**
            * @private
            * @param {BlockedUsersRequestBuilder} builder
         */
        constructor(builder?: BlockedUsersRequestBuilder);
        /**
            *
            * Get list of next set of blocked users based on the parameters specified in BlockedUsersRequestBuilder class. The Developer need to call this method repeatedly using the same object of BlockedUsersRequest class to get paginated list of blocked users.
            * @returns {Promise<User[] | []>}
         */
        fetchNext(listener?: UserFetchListener): Promise<User[] | []>;
        /**
            * Offline: additive two-phase read — onCachedUsers (instant, from the local blocked-users
            * store; served only for an explicit `blockedByMe` direction) then onServerUsers
            * (authoritative). Passing a listener STILL returns the Promise; with offline off,
            * only onServerUsers fires.
         */
        /**
            * Gets the direction type to determine the nature of the blocked users to be fetched.
            * The direction specifies whether to fetch users who are blocked by the logged-in user,
            * users who have blocked the logged-in user, or both.
            *
            * @return {string}. It can be one of "blocked_by_me", "blocked_me", or "both".
            */
        getDirection(): string;
        /**
            * Get the maximum number of blocked users to be fetched in a single operation.
            * @return {number}
            */
        getLimit(): number;
        /**
            * Get the search keyword used to filter blocked users by name or UID.
            *
            * @return {string}
            */
        getSearchKeyword(): string;
         /**
            * Get the current page number that the request is on.
            *
            * @return {number}
            */
        getPage(): number;
        /** @internal */
        getNextData(): any;
}
export class BlockedUsersRequestBuilder {
        /** @private */ limit: number;
        /** @private */ searchKeyword: string;
        /** @private */ direction: string;
        /** @private */ page: number;
        /**
            *
            * @param {number} limit
            * A method to set limit for the number of blocked users returned in a single iteration. A maximum of 100 blocked users can fetched in a single iteration.
            * @returns
         */
        setLimit(limit: number): this;
        /**
            *
            * @param {string} searchKeyword
            * A method to set the search string based on which the blocked users are to be fetched.
            * @returns
         */
        setSearchKeyword(searchKeyword: string): this;
        /**
            *
            * @param direction
            * A method to either fetch only users the logged-in user has blocked or the users who have blocked the logged-in user or both.
            * @returns
         */
        setDirection(direction: string): this;
        /**
            *
            * @param {number} page
            * A method to set the page number to start fetching from. Page 0 will fetch the first page.
            * @returns
         */
        setPage(page: number): this;
        /** @internal */
        blockedByMe(): this;
        /** @internal */
        hasBlockedMe(): this;
        /**
            * This method will return an object of the BlockedUsersRequest class.
            * @returns {BlockedUsersRequest}
         */
        build(): BlockedUsersRequest;
}

export interface CometChatSettings {
        appId: string;
        region: string;
        credentials?: {
                authKey?: string;
        };
        chatSDK?: {
                presenceSubscription?: {
                        type?: string;
                        roles?: string[];
                };
                autoEstablishSocketConnection?: boolean;
                adminHost?: string | null;
                clientHost?: string | null;
                /** Offline messaging: `true` (all defaults) or a config object. A missing `enabled` is `false` (offline stays off). */
                offline?: boolean | OfflineConfigOptions;
        };
        callsSDK?: Record<string, unknown>;
        uiKit?: Record<string, unknown>;
}

export class AppSettings {
        /** The applied offline-messaging config, or `null` when none was set (offline off). */
        getOfflineConfig(): OfflineConfig | null;
        static SUBSCRIPTION_TYPE_NONE: string;
        static SUBSCRIPTION_TYPE_ALL_USERS: string;
        static SUBSCRIPTION_TYPE_ROLES: string;
        static SUBSCRIPTION_TYPE_FRIENDS: string;
        /** @private */
        static REGION_EU: string;
        /** @private */
        static REGION_US: string;
        /** @private */
        static REGION_IN: string;
        /** @private */
        static REGION_PRIVATE: string;
        /** @private */
        subscriptionType: string;
        /** @private */
        roles: string[];
        /** @private */
        region: string;
        /** @private */
        autoJoinGroup: boolean;
        /** @private */
        establishSocketConnection: boolean;
        /** @private */
        adminHost: string;
        /** @private */
        clientHost: string;
        /**
            * @private
            * @param {AppSettingsBuilder}
         */
        constructor(builder: AppSettingsBuilder);
        /**
            * This method returns the subscription type set using one of the following methods of the AppSettingsBuilder `subscribePresenceForAllUsers()`, `subscribePresenceForRoles()` or `subscribePresenceForFriends()`.
            * @returns {string}
         */
        getSubscriptionType(): string;
        /**
            * This method returns the roles set using the `setRoles()` of the AppSettingsBuilder.
            * @returns {string[]}
         */
        getRoles(): string[];
        /**
            * This method returns the region set using the `setRegion()` of the AppSettingsBuilder.
            * @returns {string}
         */
        getRegion(): string;
        /**
            * This method returns whether auto joining of group was enabled or not using the `enableAutoJoinForGroups()` of the AppSettingsBuilder.
            * @returns {boolean}
         */
        getIsAutoJoinEnabled(): boolean;
        /**
            * This method returns whether the SDK should connect to WebSocket server when a user logs-in or not.
            * @returns {boolean}
         */
        shouldAutoEstablishSocketConnection(): boolean;
        /**
         * This method returns the admin host to which the SDK should connect.
         * @returns {boolean}
        */
        getAdminHost(): string;

        /**
         * This method returns the client host to which the SDK should connect.
         * @returns {boolean}
        */
        getClientHost(): string;
}

export class ConversationUpdateSettings {
    constructor();
    shouldUpdateOnCallActivities(): boolean;
    shouldUpdateOnGroupActions(): boolean;
    shouldUpdateOnCustomMessages(): boolean;
    shouldUpdateOnMessageReplies(): boolean;
    static fromJSON(jsonData: Object): ConversationUpdateSettings;
}

export interface FlagReason {
  id: string;
  name: string;
  description: string;
  default?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FlagMessageResponse {
  success: boolean;
  message: string;
}

export class AppSettingsBuilder {
        /** @private */
        subscriptionType: string;
        /** @private */
        roles: string[];
        /** @private */
        region: string;
        /** @private */
        autoJoinGroup: boolean;
        /** @private */
        establishSocketConnection: boolean;
        /** @private */
        adminHost: string;
        /** @private */
        clientHost: string;
        /**
            * A method to subscribe presence for all users.
            * @returns
         */
        subscribePresenceForAllUsers(): this;
        /**
            * @param {string[]} roles
            * A method to subscribe presence for all roles.
            * @returns
         */
        subscribePresenceForRoles(roles: string[]): this;
        /**
            * A method to subscribe presence for friends.
            * @returns
         */
        subscribePresenceForFriends(): this;
        /**
            * Offline messaging: supply the full config object. Takes precedence over the `offline(boolean)` shorthand when both are supplied (the object's `enabled` wins).
        */
        setOfflineConfig(config: OfflineConfig): this;
        /**
            * Offline messaging: boolean shorthand — enable with every default value. Ignored if a config object was already supplied via `setOfflineConfig` (object wins).
        */
        offline(enabled?: boolean): this;
        /**
            * @param {string} region
            * A method to set region of the app.
            * @returns
         */
        setRegion(region?: string): this;
        /**
            * @param {boolean} isAutoJoinEnabled
            * A method to enable/disable auto joining group. The default value is true.
            * @returns
         */
        enableAutoJoinForGroups(isAutoJoinEnabled?: boolean): this;
        /**
            * @param {boolean} establishSocketConnection
            * A method to auto connect to WebSocket server when a user logs-in. The default value is true.
            * @returns
         */
        autoEstablishSocketConnection(establishSocketConnection?: boolean): this;
        /**
         * @param {string} adminHost
         * This method is used to override the admin host which the SDK uses to make an API call.
         * @returns 
        */
        overrideAdminHost(adminHost: string): this;
        /**
         * @param {string} clientHost
         * This method is used to override the client host which the SDK uses to make an API call.
         * @returns 
        */
        overrideClientHost(clientHost: string): this;
        /**
            * This method will return an object of the AppSettings class.
            * @returns {AppSettings}
         */
        build(): AppSettings;
}

export class CometChatHelper {
        /** @private */
        constructor();
        /**
            * Takes JSONMessage as an input and will return an Object of BaseMessage Class.
            * @param {Object} message
            * @returns {TextMessage | MediaMessage | CustomMessage | InteractiveMessage | BaseMessage}
            * @memberof CometChatHelper
         */
        static processMessage(message: Object): Promise<TextMessage | MediaMessage | CustomMessage | InteractiveMessage | BaseMessage>;
        /**-------------------------------------------------------------------*
            * Message related functions provided by CometChat class              *
         *--------------------------------------------------------------------**/
        /**
            * Takes a Message Object and converts it into Conversation Object.
            * @param {TextMessage | MediaMessage | CustomMessage | InteractiveMessage} message
            * @returns {Conversation} conversation
            * @memberof CometChat
         */
        static getConversationFromMessage(message: TextMessage | MediaMessage | CustomMessage | InteractiveMessage | any): Promise<Conversation>;
        static updateMessageWithReactionInfo(baseMessage: BaseMessage, messageReaction: Reaction, action: REACTION_ACTION): BaseMessage | CometChatException;
}

/**
    *
    * @module Conversation
 */
export class Conversation {
        protected conversationId: string;
        protected conversationType: string;
        protected lastMessage: TextMessage | MediaMessage | CustomMessage | InteractiveMessage | any;
        protected conversationWith: User | Group;
        protected unreadMessageCount: number;
        protected unreadMentionsCount: number;
        protected lastReadMessageId: string;
        protected tags: Array<String>;
        constructor(conversationId: string, conversationType: string, lastMessage: TextMessage | MediaMessage | CustomMessage | any, conversationWith: User | Group, unreadMessageCount: number, tags: Array<String>, unreadMentionsCount: number | any, lastReadMessageId: string | any);
        /**
            * Method to set conversation ID of the conversation.
            * @param {string} conversationId
         */
        setConversationId(conversationId: string): void;
       /**
        * Method to get unreadMentionsCount of the conversation.
        * @returns {number}
        */
        getUnreadMentionsCount(): number;
        /**
         * Method to set unreadMentionsCount of the conversation.
         * @param {number}
         */
        setUnreadMentionsCount(count: number): void;
        /**
         * Method to get lastReadMessageId of the conversation.
         * @returns {string}
         */
        getLastReadMessageId(): string;
        /**
         * Method to set lastReadMessageId of the conversation.
         * @param {string}
         */
        setLastReadMessageId(id: string): void;
        /**
            * Method to set conversation type of the conversation.
            * @param {string} conversationId
         */
        setConversationType(conversationType: string): void;
        /**
            * Method to set last message of the conversation.
            * @param {TextMessage | MediaMessage | CustomMessage | any} conversationId
         */
        setLastMessage(lastMessage: TextMessage | MediaMessage | CustomMessage | any): void;
        /**
            * Method to set conversationWith of the conversation.
            * @param {User | Group} conversationId
         */
        setConversationWith(conversationWith: User | Group): void;
        /**
            * Method to set unread message count of the conversation.
            * @param {number} conversationId
         */
        setUnreadMessageCount(unreadMessageCount: number): void;
        /**
            * Method to get conversation ID of the conversation.
            * @returns {string}
         */
        getConversationId(): string;
        /**
            * Method to get conversation type of the conversation.
            * @returns {string}
         */
        getConversationType(): string;
        /**
            * Method to get last message of the conversation.
            * @returns {TextMessage | MediaMessage | CustomMessage | any}
         */
        getLastMessage(): TextMessage | MediaMessage | CustomMessage | any;
        /**
            * Method to get conversationWith of the conversation.
            * @returns {User | Group}
         */
        getConversationWith(): User | Group;
        /**
            * Method to get unread message count of the conversation.
            * @returns {number}
         */
        getUnreadMessageCount(): number;
        /**
         * Method to get tags of a conversation.
         * @returns {Array<String>}
        */
        getTags(): Array<String>;
        /**
            * Timestamp at which this conversation was pinned to the top of the list.
            * Returns undefined when not pinned — the PRESENCE of this value is the
            * flag, so test with `!== undefined` and never expect 0.
         */
        getPinnedAt(): number;
        /** @param {number} pinnedAt pass undefined to clear the pin */
        setPinnedAt(pinnedAt: number): void;
        /**
            * UID of whoever pinned it, or `app_system` for an admin/global pin, which
            * a user may not unpin. Returns undefined when not pinned.
         */
        getPinnedBy(): string;
        /** @param {string} pinnedBy pass undefined to clear */
        setPinnedBy(pinnedBy: string): void;
}

export class Attachment {
        constructor(file: Object);
        /**
            * Create the file object from the provided JSON Object.
            * @private
            * @param {Object} file
            * @returns {FileObject}
            * @memberof FileObject
         */
        createFileFromJSON(file: Object): Attachment;
        /**
            * Converts the FileObject to JSON Object.
            * @private
            * @param {FileObject} fileObject
            * @returns {Object}
            * @memberof FileObject
         */
        toJSON(attachment: Attachment): Object;
        /**
            * Get extension of the file.
            * @returns {string}
         */
        getExtension(): string;
        /**
            * Method to set extension of the file.
            * @param {string} extension
         */
        setExtension(extension: string): void;
        /**
            * Get mime type of the file.
            * @returns {string}
         */
        getMimeType(): string;
        /**
            * Method to set mimeType of the file.
            * @param {string} mimeType
         */
        setMimeType(mimeType: string): void;
        /** Offline: local file path when the media bytes are cached on device (client-only; never serialized to the wire). */
        getLocalPath(): string | undefined;
        /**
            * Get name of the file.
            * @returns {string}
         */
        getName(): string;
        /**
            * Method to set name of the file.
            * @param {string} name
         */
        setName(name: string): void;
        /**
            * Get size of the file.
            * @returns {string}
         */
        getSize(): number;
        /**
            * Method to set size of the file.
            * @param {string} name
         */
        setSize(size: number): void;
        /**
            * Get URL of the file.
            * @returns {string}
         */
        getUrl(): string;
        /**
            * Method to set URL of the file.
            * @param {string} name
         */
        setUrl(url: string): void;
        /**
            * Get metadata of the file (e.g. width, height, duration).
            * @returns {{ width?: number; height?: number; duration?: number; [key: string]: any } | undefined}
         */
        getMetadata(): { width?: number; height?: number; duration?: number; [key: string]: any } | undefined;
        /**
            * Set metadata of the file.
            * @param {{ width?: number; height?: number; duration?: number; [key: string]: any }} metadata
         */
        setMetadata(metadata: { width?: number; height?: number; duration?: number; [key: string]: any }): void;
}

export class CallSettings {
        static POSITION_TOP_LEFT: string;
        static POSITION_TOP_RIGHT: string;
        static POSITION_BOTTOM_LEFT: string;
        static POSITION_BOTTOM_RIGHT: string;
        static ASPECT_RATIO_DEFAULT: string;
        static ASPECT_RATIO_CONTAIN: string;
        static ASPECT_RATIO_COVER: string;
        constructor(builder?: CallSettingsBuilder);
        getSessionId(): string;
        isAudioOnlyCall(): boolean;
        getUser(): RTCUser;
        getRegion(): string;
        getAppId(): string;
        getDomain(): string;
        isDefaultLayoutEnabled(): boolean;
        getCallEventListener(): OngoingCallListener;
        getMode(): string;
        isEndCallButtonEnabled(): boolean;
        isSwitchCameraButtonEnabled(): boolean;
        isMuteAudioButtonEnabled(): boolean;
        isPauseVideoButtonEnabled(): boolean;
        isAudioModeButtonEnabled(): boolean;
        getStartWithAudioMuted(): boolean;
        getStartWithVideoMuted(): boolean;
        getAnalyticsSettings(): Object;
        getDefaultAudioMode(): string;
        isAudioToVideoButtonEnabled(): boolean;
        getAvatarMode(): string;
        isRecordingButtonEnabled(): boolean;
        shouldStartRecordingOnCallStart(): boolean;
        getMainVideoContainerSetting(): MainVideoContainerSetting;
        isVideoTileClickEnabled(): boolean;
        isVideoTileDragEnabled(): boolean;
}
export class CallSettingsBuilder {
        /** @private */ sessionID: string;
        /** @private */ defaultLayout: boolean;
        /** @private */ isAudioOnly: boolean;
        /** @private */ region: string;
        /** @private */ domain: string;
        /** @private */ user: RTCUser;
        /** @private */ listener: OngoingCallListener;
        /** @private */ mode: string;
        /** @private */ ShowEndCallButton: boolean;
        /** @private */ ShowSwitchCameraButton: boolean;
        /** @private */ ShowMuteAudioButton: boolean;
        /** @private */ ShowPauseVideoButton: boolean;
        /** @private */ ShowAudioModeButton: boolean;
        /** @private */ StartAudioMuted: boolean;
        /** @private */ StartVideoMuted: boolean;
        /** @private */ analyticsSettings: Object;
        /** @private */ appId: string;
        /** @private */ defaultAudioMode: string;
        /** @private */ ShowSwitchToVideoCallButton: boolean;
        /** @private */ AvatarMode: string;
        /** @private */ ShowRecordingButton: boolean;
        /** @private */ StartRecordingOnCallStart: boolean;
        /** @private */ MainVideoContainerSetting: MainVideoContainerSetting;
        /** @private */ EnableVideoTileClick: boolean;
        /** @private */ enableDraggableVideoTile: boolean;
        /**
            *
            * @param {string} sessionID
            * This methods sets the session ID of the call.
            * @returns
         */
        setSessionID(sessionID: string): this;
        /**
            *
            * @param {boolean} defaultLayout
            * This methods shows/hides the default button layout.
            * If set to true the default button layout will be shown.
            * If set to false the default button layout will be hidden.
            * Default value is true
            * @returns
         */
        enableDefaultLayout(defaultLayout: boolean): this;
        /**
            *
            * @param {boolean} isAudioOnly
            * This methods sets the type(audio/video) of the call.
            * If set to true, the call will be strictly an audio call.
            * If set to false, the call will be an audio-video call.
            * Default value is false
            * @returns
         */
        setIsAudioOnlyCall(isAudioOnly: boolean): this;
        /**
            * @private
            * @param {string} region
            * This method sets the region of the app.
            * @returns
         */
        setRegion(region: string): this;
        /**
            * @private
            * @param {string} domain
            * This method sets the domain of the app.
            * @returns
         */
        setDomain(domain: string): this;
        /**
            * @private
            * @param {RTCUser} user
            * This method sets the user.
            * @returns
         */
        setUser(user: RTCUser): this;
        /**
            *
            * @param {OngoingCallListener} listener
            * This method sets the call event listener.
            * @returns
         */
        setCallEventListener(listener: OngoingCallListener): this;
        /**
            *
            * @param {string} mode
            * This method sets the mode of the call.
            * @returns
         */
        setMode(mode: string): this;
        /**
            *
            * @param {boolean} showEndCallButton
            * This method shows/hides the end call button.
            * If set to true it will display the end call button.
            * If set to false it will hide the end call button.
            * Default value is true.
            * @returns
         */
        showEndCallButton(showEndCallButton: boolean): this;
        /**
            *
            * @param {boolean} showSwitchCameraButton
            * This method shows/hides the switch camera button.
            * If set to true it will display the switch camera button.
            * If set to false it will hide the switch camera button.
            * Default value is true.
            * @returns
         */
        showSwitchCameraButton(showSwitchCameraButton: boolean): this;
        /**
            *
            * @param {boolean} showMuteAudioButton
            * This method shows/hides the mute audio button.
            * If set to true it will display the mute audio button.
            * If set to false it will hide the mute audio button.
            * Default value is true.
            * @returns
         */
        showMuteAudioButton(showMuteAudioButton: boolean): this;
        /**
            *
            * @param {boolean} showPauseVideoButton
            * This method shows/hides the pause video button.
            * If set to true it will display the pause video button.
            * If set to false it will hide the pause video button.
            * Default value is true.
            * @returns
         */
        showPauseVideoButton(showPauseVideoButton: boolean): this;
        /**
            *
            * @param {boolean} showAudioModeButton
            * This method shows/hides the audio mode button.
            * If set to true it will display the audio mode button.
            * If set to false it will hide the audio mode button.
            * Default value is true.
            * @returns
         */
        showAudioModeButton(showAudioModeButton: boolean): this;
        /**
            *
            * @param {boolean} audioMuted
            * This method allows the call to be started with audio muted.
            * If set to true, the call will start with audio muted.
            * Default value is false.
            * @returns
         */
        startWithAudioMuted(audioMuted: boolean): this;
        /**
            *
            * @param {boolean} videoMuted
            * This method allows the call to be started with video muted.
            * If set to true, the call will start with video muted.
            * Default value is false.
            * @returns
         */
        startWithVideoMuted(videoMuted: boolean): this;
        /**
            * @private
            * @param {Object} analyticsSettings
            * This method will set the settings required for analytics.
            * @returns
         */
        setAnalyticsSettings(analyticsSettings: Object): this;
        /**
            * @private
            * @param {string} appId
            * This method will set the appID.
            * @returns
         */
        setAppId(appId: string): this;
        /**
            *
            * @param {string} audioMode
            * This method will set the default audio mode.
            * @returns
         */
        setDefaultAudioMode(audioMode: string): this;
        /**
         * 
         * @param {boolean} showAudioToVideoSwitchButton 
         * This method shows/hides the switch to video call button.
         * If set to true it will display the switch to video call button. 
         * If set to false it will hide the switch to video call button.
         * Default value is true.
         * @returns 
        */
        showSwitchToVideoCallButton(showAudioToVideoSwitchButton: boolean): this;
        /**
          * 
          * @param {string} mode 
          * This method sets the mode of avatar.
          * The avatar mode can be circle, square or fullscreen.
          * Default value is circle.
          * @returns 
         */
        setAvatarMode(mode: string): this;
        /**
          * 
          * @param {boolean} showRecordingButton 
          * This method shows/hides the recording button.
          * If set to true it will display the recording button. 
          * If set to false it will hide the recording button.
          * Default value is false.
          * @returns 
         */
        showRecordingButton(showRecordingButton: boolean): this;
        /**
          * 
          * @param {boolean} startRecordingOnCallStart 
          * This method starts the recording as soon as the call start.
          * If set to true it will start the recording as soon as the call start.
          * Default value is false.
          * @returns 
         */
        startRecordingOnCallStart(startRecordingOnCallStart: boolean): this;
        /**
         * 
         * @param {MainVideoContainerSetting} mainVideoContainerSetting 
         * This method can be used to customize the main video container.
         * @returns 
        */
        setMainVideoContainerSetting(mainVideoContainerSetting: MainVideoContainerSetting): this;
        /**
         * 
         * @param {boolean} enableVideoTileClick 
         * This method can be used to enable/disable video tile click functionality in Spotlight mode.
         * By default the video tile is clickable.
         * @returns 
        */
        enableVideoTileClick(enableVideoTileClick: boolean): this;
        /**
         * 
         * @param {boolean} enableVideoTileDrag 
         * This method can be used to enable/disable video tile drag functionality in Spotlight mode.
         * By default the video tile is draggable.
         * @returns 
        */
        enableVideoTileDrag(enableVideoTileDrag: boolean): this;
        /**
            * This method will return an object of the CallSettings class.
            * @returns {CallSettings}
         */
        build(): CallSettings;
}

export class MainVideoContainerSetting{
    /** @private */  videoFit: string;
    /** @private */  zoomButton: Object;
    /** @private */  fullScreenButton: Object;
    /** @private */  userListButton: Object;
    /** @private */  nameLabel: Object;

    /**
     * 
     * @param {string} mainVideoAspectRatio 
     * This method is used to set the aspect ratio of main video.
     * The default value is `contain`.
     * @returns 
    */
    setMainVideoAspectRatio(mainVideoAspectRatio: string): void;
    
    /**
     * 
     * @param {string} position 
     * @param {boolean} visibility 
     * This method is used to set the position & visibility parameter of the full screen button.
     * By default the full screen button is visible in the `bottom-right` position.
     * @returns 
    */
    setFullScreenButtonParams(position: string, visibility: boolean): void;

    /**
     * 
     * @param {string} position 
     * @param {boolean} visibility 
     * @param {string} backgroundColor 
     * This method is used to set the position, visibility & background color of the name label.
     * By default the name label is visible in the `bottom-right` position with a background-color `#333333`.
     * @returns 
    */
    setNameLabelParams(position: string, visibility: boolean, backgroundColor: string): void;

    /**
     * 
     * @param {string} position 
     * @param {boolean} visibility 
     * This method is used to set the position & visibility parameter of the zoom button.
     * By default the zoom button is visible in the `bottom-right` position.
     * @returns 
    */
    setZoomButtonParams(position: string, visibility: boolean): void;

    /**
     * 
     * @param {string} position 
     * @param {boolean} visibility 
     * This method is used to set the position & visibility parameter of the user list button.
     * By default the user list button is visible in the `bottom-right` position.
     * @returns 
    */
    setUserListButtonParams(position: string, visibility: boolean): void;
}

type MyState = {
        shouldLoad: boolean;
};
/**
    * CallingComponent takes `callsettings` as a prop and loads the Calling Screen.
    * ```tsx
    * <CometChat.CallingComponent callsettings = {...}> </CometChat.CallingComponent>
    * ```
 */
export class CallingComponent extends React.Component<{
        callsettings: CallSettings;
}, MyState> {}

export class CCExtension {
        constructor(extension: any);
        /**
            * This method returns the id of the extension.
            * @returns {string}
         */
        getId(): string;
        /**
            * This method returns the name of the extension.
            * @returns {string}
         */
        getName(): string;
}

export class TransientMessage {
        protected data: any;
        constructor(receiverId: string, receiverType: string, data: any);
        /**
            * Method to get receiverID of the transient message.
            * @returns {string}
         */
        getReceiverId(): string;
        /**
            * Method to set receiverID of the transient message.
            * @param {string} receiverId
         */
        setReceiverId(receiverId: string): void;
        /**
            * Method to get receiver type of the transient message.
            * @returns {string}
         */
        getReceiverType(): string;
        /**
            * Method to set receiver type of the transient message.
            * @param {string} receiverType
         */
        setReceiverType(receiverType: string): void;
        /**
            * Method to get data of the transient message.
            * @returns {any}
         */
        getData(): any;
        /**
            * Method to set data of the transient message.
            * @param {any} data
         */
        setData(data: any): void;
        /**
            * Method to get sender of the transient message.
            * @returns {User}
         */
        getSender(): User;
        /**
            * Method to set sender of the transient message.
            * @param {User} sender
         */
        setSender(sender: User): void;
}

/**
  *
  *
  * @export
  * @interface ErrorModel
  */
export interface ErrorModel {
    code?: string | number;
    name?: string;
    message?: string;
    details?: string;
    /**
     * Structured parameters the server attaches to an error, passed through
     * verbatim. Lets a consumer read a server-owned value — `errorParams.limit`
     * on a pin/save cap breach, for one — instead of parsing it out of `message`.
     */
    errorParams?: { [key: string]: any };
}

/**
    *
    * @module MessageReceipt
 */
export class MessageReceipt {
        RECEIPT_TYPE: {
            READ_RECEIPT: string;
            DELIVERY_RECEIPT: string;
            READ_BY_ALL_RECEIPT: string;
            DELIVERED_TO_ALL_RECEIPT: string;
        };
        /**
            * Method to get receiver type of the message receipt.
            * @returns {string}
         */
        getReceiverType(): string;
        /**
            * Method to set receiver type of the message receipt.
            * @param {string} receiverType
         */
        setReceiverType(receiverType: string): void;
        /**
            * Method to get sender of the message receipt.
            * @returns {User}
         */
        getSender(): User;
        /**
            * Method to set sender of the message receipt.
            * @param {User} sender
         */
        setSender(sender: User): void;
        /**
            * Method to get receiver of the message receipt.
            * @returns {string}
         */
        getReceiver(): string;
        /**
            * Method to set receiver of the message receipt.
            * @param {string} receiver
         */
        setReceiver(receiver: string): void;
        /**
            * Method to get timestamp of the message receipt.
            * @returns {string}
         */
        getTimestamp(): string;
        /**
            * Method to set timestamp of the message receipt.
            * @param {string} timestamp
         */
        setTimestamp(timestamp: string): void;
        /**
            * Method to set readAt timestamp of the message receipt.
            * @param {number} readAt
         */
        setReadAt(readAt: number): void;
        /**
            * Method to get readAt timestamp of the message receipt.
            * @returns {number}
         */
        getReadAt(): number;
        /**
            * Method to set deliveredAt timestamp of the message receipt.
            * @param {number} deliveredAt
         */
        setDeliveredAt(deliveredAt: number): void;
        /**
            * Method to get deliveredAt timestamp of the message receipt.
            * @returns {number}
         */
        getDeliveredAt(): number;
        /**
            * Method to get the message ID.
            * @returns {string}
         */
        getMessageId(): string;
        /**
            * Method to set the message ID.
            * @param {string} messageId
         */
        setMessageId(messageId: string): void;
        /**
            * Method to get the receipt type of message receipt.
            * @returns {string}
         */
        getReceiptType(): string;
        /**
            * Method to set the receipt type of message receipt.
            * @param {string} receiptType
         */
        setReceiptType(receiptType?: string): void;
}

export class ReactionCount {
    constructor(reaction: string, count: number, reactedByMe: boolean);
    /**
        * Method to get reacted reaction.
        * @returns {string}
        */
    getReaction(): string;
    /**
        * Method to set reacted reaction.
        */
    setReaction(reaction: string): void;
    /**
        * Method to get no of users reacted with a reaction.
        * @returns {number}
        */
    getCount(): number;
    /**
        * Method to set no of users reacted with a reaction.
        */
    setCount(count: number): void;
    /**
        * Method to get if loggedIn user reacted with the a reaction.
        * @returns {boolean}
        */
    getReactedByMe(): boolean;
    /**
        * Method to set if loggedIn user reacted with the a reaction.
        */
    setReactedByMe(reactedByMe: boolean): void;
}

export class ReactionEvent {
    constructor(reaction: Reaction, receiverId: string, receiverType: string, conversationId: string, parentMessageId?: string);
    getReaction(): Reaction;
    setReaction(reaction: Reaction): void;
    getReceiverId(): string;
    setReceiverId(receiverId: string): void;
    getReceiverType(): string;
    setReceiverType(receiverType: string): void;
    getConversationId(): string;
    setConversationId(conversationId: string): void;
    getParentMessageId(): string;
    setParentMessageId(parentMessageId: string): void;
}

export class Reaction {
    constructor(reactionId: string, messageId: string, reaction: string, uid: string, reactedAt: number, reactedBy: User);
    getReactionId(): string;
    setReactionId(id: string): void;
    getMessageId(): string;
    setMessageId(messageId: string): void;
    getReaction(): string;
    setReaction(reaction: string): void;
    getUid(): string;
    setUid(uid: string): void;
    getReactedAt(): number;
    setReactedAt(reactedAt: number): void;
    getReactedBy(): User;
    setReactedBy(reactedBy: User): void;
}

    /**
        * Base interface for all assistant event data
        * @internal
        */
    export interface AssistantBaseEventData {
        timestamp: number;
        runId: string;
        threadId: string;
        [key: string]: any;
    }
    /**
        * Base class for stream events in CometChat SDK
        */
    export class AIAssistantBaseEvent<T extends AssistantBaseEventData = AssistantBaseEventData> {
        /**
            * The type of the stream event
            */
        type: string;
        /**
            * The conversation ID associated with the event
            */
        conversationId: string;
        /**
            * The message ID associated with the event
            */
        messageId: string;
        /**
            * The parent message ID (if applicable)
            */
        parentId: string;
        /**
            * Additional data associated with the event
            */
        data: T;
        /**
            * Constructor for BaseStreamEvent
            * @param type - The type of the stream event
            * @param conversationId - The conversation ID
            * @param messageId - The message ID
            * @param parentId - The parent message ID
            * @param data - Additional data with timestamp
            */
        constructor(type: string, conversationId: string, messageId: string, parentId: string, data: T);
        /**
            * Get the type of the stream event
            * @returns The type as a string
            */
        getType(): string;
        /**
            * Set the type of the stream event
            * @param type - The type to set
            */
        setType(type: string): void;
        /**
            * Get the conversation ID
            * @returns The conversation ID as a string
            */
        getConversationId(): string;
        /**
            * Set the conversation ID
            * @param conversationId - The conversation ID to set
            */
        setConversationId(conversationId: string): void;
        /**
            * Get the message ID
            * @returns The message ID as a string
            */
        getMessageId(): string;
        /**
            * Set the message ID
            * @param messageId - The message ID to set
            */
        setMessageId(messageId: string): void;
        /**
            * Get the parent message ID
            * @returns The parent message ID as a string
            */
        getParentId(): string;
        /**
            * Set the parent message ID
            * @param parentId - The parent message ID to set
            */
        setParentId(parentId: string): void;
        /**
            * Get the data object
            * @returns The data object
            */
        getData(): T;
        /**
            * Set the data object
            * @param data - The data object to set
            */
        setData(data: T): void;
        /**
            * Get the timestamp from the data object
            * @returns The timestamp as a number
            */
        getTimestamp(): number;
        /**
            * Set the timestamp in the data object
            * @param timestamp - The timestamp to set
            */
        setTimestamp(timestamp: number): void;
        /**
            * Get the run ID from the data object
            * @returns The run ID as a string
            */
        getRunId(): string;
        /**
            * Set the run ID in the data object
            * @param runId - The run ID to set
            */
        setRunId(runId: string): void;
        /**
            * Get the thread ID from the data object
            * @returns The thread ID as a string
            */
        getThreadId(): string;
        /**
            * Set the thread ID in the data object
            * @param threadId - The thread ID to set
            */
        setThreadId(threadId: string): void;
        /**
            * Convert the event to a JSON object
            * @returns JSON representation of the event
            */
        toJSON(): object;
        /**
            * Create a BaseStreamEvent from a JSON object
            * @param json - The JSON object to create the event from
            * @returns A new BaseStreamEvent instance
            */
        static fromJSON(json: any): AIAssistantBaseEvent;
    }

    /**
      * Data structure for run events (run_started, run_finished)
      * @internal
      */
    export interface AssistantRunStartedEventData extends AssistantBaseEventData {
        [key: string]: any;
    }
    export class AIAssistantRunStartedEvent extends AIAssistantBaseEvent<AssistantRunStartedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantRunStartedEventData);
    }

    /**
      * Data structure for run events (run_started, run_finished)
      * @internal
      */
    export interface AssistantRunFinishedEventData extends AssistantBaseEventData {
        [key: string]: any;
    }
    export class AIAssistantRunFinishedEvent extends AIAssistantBaseEvent<AssistantRunFinishedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantRunFinishedEventData);
    }

    /**
        * Data structure for message events (text_message_start, text_message_end)
        * @internal
        */
    export interface AssistantMessageStartedEventData extends AssistantBaseEventData {
        role: string;
        [key: string]: any;
    }
    export class AIAssistantMessageStartedEvent extends AIAssistantBaseEvent<AssistantMessageStartedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantMessageStartedEventData);
        /**
            * Returns the role of the event
            * @returns {string | undefined} The role of the event
            */
        getRole(): string | undefined;
        /**
            * Sets the role of the event
            * @param {string} role - The role to set
            */
        setRole(role: string): void;
    }

    /**
      * Data structure for message events (text_message_start, text_message_end)
      * @internal
      */
    export interface AssistantMessageEndedEventData extends AssistantBaseEventData {
        [key: string]: any;
    }
    export class AIAssistantMessageEndedEvent extends AIAssistantBaseEvent<AssistantMessageEndedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantMessageEndedEventData);
    }

    /**
        * Data structure for content events (text_message_content)
        * @internal
        */
    export interface AssistantContentEventData extends AssistantBaseEventData {
        delta: string;
        [key: string]: any;
    }
    /**
        * Event class for text message content received from assistant
        */
    export class AIAssistantContentReceivedEvent extends AIAssistantBaseEvent<AssistantContentEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantContentEventData);
        /**
            * Gets the delta value for the content received event
            * @returns The delta string
            */
        getDelta(): string;
        /**
            * Sets the delta value for the content received event
            * @param delta - The delta string to set
            */
        setDelta(delta: string): void;
    }

    /**
        * Data structure for tool call started events
        * @internal
        */
    export interface AssistantToolStartedEventData extends AssistantBaseEventData {
        toolCallId: string;
        toolCallName: string;
        displayName: string;
        executionText: string;
        [key: string]: any;
    }
    /**
        * Event class for tool call started events
        */
    export class AIAssistantToolStartedEvent extends AIAssistantBaseEvent<AssistantToolStartedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantToolStartedEventData);
        /**
            * Gets the tool call ID for the tool started event
            * @returns The tool call ID
            */
        getToolCallId(): string;
        /**
            * Sets the tool call ID for the tool started event
            * @param toolCallId - The tool call ID to set
            */
        setToolCallId(toolCallId: string): void;
        /**
            * Gets the tool call name for the tool started event
            * @returns The tool call name
            */
        getToolCallName(): string;
        /**
            * Sets the tool call name for the tool started event
            * @param toolCallName - The tool call name to set
            */
        setToolCallName(toolCallName: string): void;
        /**
            * Gets the display name for the tool started event
            * @returns The display name
            */
        getDisplayName(): string;
        /**
            * Sets the display name for the tool started event
            * @param displayName - The display name to set
            */
        setDisplayName(displayName: string): void;
        /**
            * Gets the execution text for the tool started event
            * @returns The execution text
            */
        getExecutionText(): string;
        /**
            * Sets the execution text for the tool started event
            * @param executionText - The execution text to set
            */
        setExecutionText(executionText: string): void;
    }

    /**
        * Data structure for tool call argument events
        * @internal
        */
    export interface AssistantToolArgumentEventData extends AssistantBaseEventData {
        toolCallId: string;
        delta: string;
        [key: string]: any;
    }
    /**
        * Event class for tool call argument events
        */
    export class AIAssistantToolArgumentEvent extends AIAssistantBaseEvent<AssistantToolArgumentEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantToolArgumentEventData);
        /**
            * Gets the tool call ID for the tool argument event
            * @returns The tool call ID
            */
        getToolCallId(): string;
        /**
            * Sets the tool call ID for the tool argument event
            * @param toolCallId - The tool call ID to set
            */
        setToolCallId(toolCallId: string): void;
        /**
            * Gets the delta value for the tool argument event
            * @returns The delta string
            */
        getDelta(): string;
        /**
            * Sets the delta value for the tool argument event
            * @param delta - The delta string to set
            */
        setDelta(delta: string): void;
    }

    /**
        * Data structure for tool call ended events
        * @internal
        */
    export interface AssistantToolEndedEventData extends AssistantBaseEventData {
        toolCallId: string;
        [key: string]: any;
    }
    /**
        * Event class for tool call ended events
        */
    export class AIAssistantToolEndedEvent extends AIAssistantBaseEvent<AssistantToolEndedEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantToolEndedEventData);
        /**
            * Gets the tool call ID for the tool ended event
            * @returns The tool call ID
            */
        getToolCallId(): string;
        /**
            * Sets the tool call ID for the tool ended event
            * @param toolCallId - The tool call ID to set
            */
        setToolCallId(toolCallId: string): void;
        /**
            * Converts the event to a JSON representation
            * @returns The JSON representation of the event
            */
        static fromJSON(json: any): AIAssistantToolEndedEvent;
    }

    /**
        * Data structure for tool call result events
        * @internal
        */
    export interface AssistantToolResultEventData extends AssistantBaseEventData {
        toolCallId: string;
        content: string;
        role: string;
        [key: string]: any;
    }
    /**
        * Event class for tool call result events
        */
    export class AIAssistantToolResultEvent extends AIAssistantBaseEvent<AssistantToolResultEventData> {
        constructor(conversationId: string, messageId: string, parentId: string, data: AssistantToolResultEventData);
        /**
            * Gets the tool call ID for the tool result event
            * @returns The tool call ID
            */
        getToolCallId(): string;
        /**
            * Sets the tool call ID for the tool result event
            * @param toolCallId - The tool call ID to set
            */
        setToolCallId(toolCallId: string): void;
        /**
            * Gets the content of the tool result event
            * @returns The content string
            */
        getContent(): string;
        /**
            * Sets the content of the tool result event
            * @param content - The content string to set
            */
        setContent(content: string): void;
        /**
            * Returns the role of the event
            * @returns {string | undefined} The role of the event
            */
        getRole(): string;
        /**
            * Sets the role of the event
            * @param {string} role - The role to set
            */
        setRole(role: string): void;
    }
export class RTCUser {
    constructor(uid: string);
    setUID(uid: string): void;
    getUID(): string;
    setName(name: string): void;
    getName(): string;
    setAvatar(avatar: string): void;
    getAvatar(): string;
    setJWT(jwt: string): void;
    getJWT(): string;
    setResource(resource: string): void;
    getResource(): string;
}

export class AudioMode {
    constructor(mode: string, isSelected: boolean);

    /**
     * Method to set mode.
     * @param {string} mode
    */
    setMode(mode: string): void;

    /**
     * Method to get mode.
     * @returns {string}
    */
    getMode(): string;

    /**
     * Method to set the mode as selected.
     * @param {boolean} isSelected
    */
    setIsSelected(isSelected: boolean): void;

    /**
     * Method to check if the audio mode is currently beign used or not.
     * @returns {boolean}
    */
    getIsSelected(): boolean;
}
/**
    *
    * @module InteractiveMessage
    */
export class InteractiveMessage extends BaseMessage implements Message {
    /** @private */ static readonly TYPE: {
            TEXT: string;
            MEDIA: string;
            IMAGE: string;
            VIDEO: string;
            AUDIO: string;
            FILE: string;
            CUSTOM: string;
            ASSISTANT: string;
            TOOL_RESULT: string;
            TOOL_ARGUMENTS: string;
    };
    /** @private */ static readonly RECEIVER_TYPE: {
            USER: string;
            GROUP: string;
    };
    /** @private */ static readonly CATEGORY: {
            MESSAGE: string;
            ACTION: string;
            CALL: string;
            CUSTOM: string;
            INTERACTIVE: string;
            AGENTIC: string;
    };
    private interactiveData;
    private interactionGoal;
    protected data?;
    private interactions?;
    private tags?;
    private allowSenderInteraction?;
    constructor(...args: any[]);
    /**
        * Method to get sender of the message.
        * @returns {User}
     */
    getSender(): User;
    /**
        * Method to get interactive data of the message.
        * @returns {Object}
     */
    getInteractiveData(): Object;
    /**
        * Method to set interactive data of interactive message.
        * @param {Object} interactiveData
     */
    setInteractiveData(interactiveData: Object): void;
    /**
        * Method to get receiver of the message.
        * @returns {User|Group}
     */
    getReceiver(): User | Group;
    /**
        * Method to interaction goal of the message.
        * @returns {InteractionGoal}
     */
    getInteractionGoal(): InteractionGoal;
    /**
        * Method to set interaction goal of interactive message.
        * @param {InteractionGoal} interactionGoal
     */
    setInteractionGoal(interactionGoal: InteractionGoal): void;
    /**
        * Method to get interactions on the message.
        * @returns {Array<Interaction>}
     */
    getInteractions(): Array<Interaction>;
    /**
        * Method to set interactions of interactive message.
        * @param {Array<Interaction>} interactions
     */
    setInteractions(interactions: Array<Interaction>): void;
    /**
        * Method to get metadata of the message.
        * @returns {Object}
     */
    getMetadata(): Object;
    /**
        * Method to set sender metadata of the message.
        * @returns {User}
     */
    setMetadata(metadata: Object): void;
    /**
        * Method to get data of the message.
        * @returns {any}
     */
    getData(): any;
    /**
        * Method to get tags of the message.
        * @returns {Array<String>}
     */
    getTags(): Array<String>;
    /**
        * Get the set tags fo the message .
        *  @returns {Array<String>}
     */
    setTags(tags: Array<String>): void;
    /**
     * @param {boolean} flag
     * Set the flag if sender is allowed to interact with the with the message.
    */
    setIsSenderInteractionAllowed(flag: boolean): void;
    /**
        * Get the flag which signifies if sender interaction is allowed .
        *  @returns {boolean}
     */
    getIsSenderInteractionAllowed(flag: boolean): boolean;
}

/**
*
* @module InteractionGoal
*/
export class InteractionGoal {
    constructor(type: GoalType, elementIds: Array<String>);
    /**
        * Get the type of the interaction goal.
        * @returns {GoalType}
     */
    getType(): GoalType;
    /**
        * @param {GoalType} type
        * Set the type of goal for the message.
     */
    setType(type: GoalType): void;
    /**
        * Get the element ids of the interacttion goal.
        * @returns {Array<String>}
     */
    getElementIds(): Array<String>;
    /**
        * @param {Array<String>} elementIds
        * Set the element id for the intearction goal.
     */
    setElementIds(elementIds: Array<String>): void;
}

export class Interaction {
    constructor(elementId: string, interactedAt: number);
    /**
        * Get the element id of the interaction.
        * @returns {string}
     */
    getElementId(): string;
    /**
     * Get the time of the interaction.
     * @returns {number}
    */
    getInteractedAt(): number;
    /**
    * @param {string} elementId
    * Set the element id.
 */
    setElementId(elementId: string): void;
    /**
    * @param {number} interactedAt
    * Set the time of intertaction .
 */
    setInteractedAt(interactedAt: number): void;
    static getInteractionFromJSON(message: any): Interaction;
}

/**
*
* @module InteractionReceipt
*/
export class InteractionReceipt {
    /**
        * Method to get receiver type of the interaction receipt.
        * @returns {string}
     */
    getReceiverType(): string;
    /**
        * Method to set receiver type of the interaction receipt.
        * @param {string} receiverType
     */
    setReceiverType(receiverType: string): void;
    /**
        * Method to get sender of the interaction receipt.
        * @returns {User}
     */
    getSender(): User;
    /**
        * Method to set sender of the interaction receipt.
        * @param {User} sender
     */
    setSender(sender: User): void;
    /**
        * Method to get receiver id of the interaction receipt.
        * @returns {string}
     */
    getReceiveId(): string;
    /**
        * Method to set receiver of the interaction receipt.
        * @param {string} receiverId
     */
    setReceiverId(receiverId: string): void;
    /**
        * Method to get the message ID.
        * @returns {string}
     */
    getMessageId(): string;
    /**
        * Method to set the message ID.
        * @param {string} messageId
     */
    setMessageId(messageId: string): void;
    /**
        * Method to get the interactions.
        * @returns { Array<Interaction>}
     */
    getInteractions(): Array<Interaction>;
    /**
        * Method to set the interactions.
        * @param {Array<Interaction>} interactions
     */
    setInteractions(interactions: Array<Interaction>): void;
}

export class ReactionsRequest {
    constructor(builder?: ReactionsRequestBuilder);
    /**
        * Gets the limit on the number of reactions to be fetched in a single operation.
        * The default value is {@value #DEFAULT_LIMIT} and the maximum allowed value is {@value #MAX_LIMIT}.
        *
        * @return {number}.
        */
    getLimit(): number;
    /**
     * Gets the message ID for which reactions are to be fetched.
     *
     * @return {number}
     */
    getMessageId(): number;
    /**
     * Gets the specific reaction type by which reactions are to be fetched.
     * This can be used to filter reactions of a specific type (e.g., "like", "love").
     *
     * @return The reaction type as a {@code String}.
     */
    getReaction(): string;
    /**
        * Get list of next reactions list based on the parameters specified in ReactionsRequestBuilder class. The Developer need to call this method repeatedly using the same object of ReactionsRequest class to get paginated list of reactions.
        * @returns {Promise<Reaction[] | []>}
        */
    fetchNext(listener?: ReactionFetchListener): Promise<Reaction[] | []>;
    /**
        * Get list of previous reactions list based on the parameters specified in ReactionsRequestBuilder class. The Developer need to call this method repeatedly using the same object of ReactionsRequest class to get paginated list of reactions.
        * @returns {Promise<Reaction[] | []>}
        */
    fetchPrevious(listener?: ReactionFetchListener): Promise<Reaction[] | []>;
}
export class ReactionsRequestBuilder {
    /** @private */ limit?: number;
    /** @private */ msgId: number;
    /** @private */ reaction?: string;
    /**
        * A method to set limit for the number of entries returned in a single iteration. Up to 1000 entries can be
        * fetched in a single iteration (the server's cap); a larger limit is treated as 1000.
        * @param {number} limit
        * @returns
        */
    setLimit(limit: number): this;
    /**
        * A method to set message ID for which reactions needed to fetch.
        * @param {number} id
        * @returns
        */
    setMessageId(id?: number): this;
    /**
        * A method to fetch list of Reaction for a specific reaction.
        * @returns
        */
    setReaction(reaction: string): this;
    /**
        * This method will return an object of the ReactionsRequest class.
        * @returns {ReactionsRequest}
        */
    build(): ReactionsRequest;
}


export enum FeedReadState {
    READ = "read",
    UNREAD = "unread",
    ALL = "all",
}

export class NotificationFeedItem {
    static fromJSON(json: any): NotificationFeedItem;
    getId(): string;
    setId(id: string): void;
    getCategory(): string;
    setCategory(category: string): void;
    getContent(): object;
    setContent(content: object): void;
    getReadAt(): number | null;
    setReadAt(readAt: number | null): void;
    getDeliveredAt(): number | null;
    setDeliveredAt(deliveredAt: number | null): void;
    getSentAt(): number;
    setSentAt(sentAt: number): void;
    getMetadata(): Record<string, any>;
    setMetadata(metadata: Record<string, any>): void;
    getTags(): string[];
    setTags(tags: string[]): void;
    getSender(): string;
    setSender(sender: string): void;
    getReceiver(): string;
    setReceiver(receiver: string): void;
    getReceiverType(): string;
    setReceiverType(receiverType: string): void;
    getIsRead(): boolean;
}

export class NotificationCategory {
    static fromJSON(json: any): NotificationCategory;
    getId(): string;
    setId(id: string): void;
    getLabel(): string;
    setLabel(label: string): void;
}

export class PushNotification {
    constructor(pushJson?: Record<string, any>);
    getId(): string;
    setId(id: string): void;
    getAnnouncementId(): string;
    setAnnouncementId(announcementId: string): void;
    getCampaignId(): string | null;
    setCampaignId(campaignId: string | null): void;
    getSource(): string;
    setSource(source: string): void;
}

export class NotificationFeedListener {
    onFeedItemReceived?: (feedItem: NotificationFeedItem) => void;
    constructor(options: { onFeedItemReceived?: (feedItem: NotificationFeedItem) => void });
}

/**
    * Conversation events — pin/unpin. Fired for pins made on the logged-in user's other devices
    * and for admin pins. Never fired for a pin or unpin made on this device: that one learns
    * from the pinConversation()/unpinConversation() promise. The payload
    * may be compact (no last message or unread count): merge its pin attributes into the
    * conversation you already hold rather than replacing it.
*/
export class ConversationListener {
    onConversationPinned?: (conversation: Conversation) => void;
    onConversationUnpinned?: (conversation: Conversation) => void;
    constructor(options: { onConversationPinned?: (conversation: Conversation) => void; onConversationUnpinned?: (conversation: Conversation) => void });
}

export class NotificationFeedRequest {
    constructor(builder?: NotificationFeedRequestBuilder);
    getLimit(): number;
    getReadState(): FeedReadState;
    getCategory(): string | null;
    getChannelId(): string | null;
    getTags(): string[] | null;
    getDateFrom(): string | null;
    getDateTo(): string | null;
    fetchNext(listener?: FeedItemFetchListener): Promise<NotificationFeedItem[]>;
}

export class NotificationFeedRequestBuilder {
    setLimit(limit: number): this;
    setReadState(state: FeedReadState): this;
    setCategory(category: string): this;
    setChannelId(channelId: string): this;
    setTags(tags: string[]): this;
    setDateFrom(date: string): this;
    setDateTo(date: string): this;
    build(): NotificationFeedRequest;
}

export class NotificationCategoriesRequest {
    constructor(builder?: NotificationCategoriesRequestBuilder);
    getLimit(): number;
    fetchNext(): Promise<NotificationCategory[]>;
}

export class NotificationCategoriesRequestBuilder {
    setLimit(limit: number): this;
    build(): NotificationCategoriesRequest;
}

/* ═══════════════════════ Offline Messaging (opt-in) ═══════════════════════ */

/** Offline: derived message status. */
export enum MessageStatus {
        PENDING = "PENDING",
        SENDING = "SENDING",
        SENT = "SENT",
        DELIVERED = "DELIVERED",
        READ = "READ",
        FAILED = "FAILED",
}

/** Offline: how a message reached this device — live socket vs reconnect catch-up sweep. */
export enum MessageSource {
        REALTIME = "REALTIME",
        SYNC = "SYNC",
}

/** Offline: why a queued send failed. */
export enum MessageFailureReason {
        /** Server overloaded / throttled (HTTP 5xx, 429; fails at once), or no answer on 5 reconnects in a row (`ERROR_OUTBOX_AUTO_FLUSH_CAP_REACHED`). `retryAllFailedMessages()` re-sends it. */
        TRANSIENT = "TRANSIENT",
        /** Rejected (4xx / blocked / auth / unknown), or a queued message that cannot be rebuilt / its media copy failed. Retry per message. */
        PERMANENT = "PERMANENT",
        QUEUE_OVERFLOW = "QUEUE_OVERFLOW",
        QUEUE_FULL = "QUEUE_FULL",
        BYTE_OVERFLOW = "BYTE_OVERFLOW",
        /** Removed before it was sent — `clearOfflineCache()`, or its conversation was purged (deleted, left, kicked/banned, or gone from the server list). Final. */
        DISCARDED = "DISCARDED",
}

/** Offline: why the SDK wiped and rebuilt the offline cache on its own (see `OfflineCacheResetListener`). */
export enum OfflineCacheResetReason {
        KEY_LOST = "KEY_LOST",
        WRONG_KEY = "WRONG_KEY",
        CORRUPTED = "CORRUPTED",
        ESCALATED = "ESCALATED",
        /** The app changed the `encryption` setting, so the existing cache could not be reused. */
        ENCRYPTION_CHANGED = "ENCRYPTION_CHANGED",
        /** The cache had a schema this SDK cannot migrate (a newer SDK's, after a rollback, or an older one no migration covers), so it was rebuilt. */
        SCHEMA_RESET = "SCHEMA_RESET",
}

/** Offline: told when the SDK wiped and rebuilt the offline cache (register via `CometChat.addOfflineCacheResetListener`). */
export interface OfflineCacheResetListener {
        /**
         * @param pendingMessagesLost unsent messages lost in the wipe, or `-1`
         * (`CometChat.OFFLINE_PENDING_COUNT_UNKNOWN`) when they could not be counted — "unknown", not "none".
         */
        onOfflineCacheReset?(reason: OfflineCacheResetReason, pendingMessagesLost: number): void;
}

/** Offline: `pendingMessagesLost` value meaning "could not be counted" (NOT "none"). */
export const OFFLINE_PENDING_COUNT_UNKNOWN: -1;

/** Offline: media caching mode — `AUTO` caches incoming media bytes, `OFF` caches metadata only. Fixed for the SDK session. */
export enum MediaCachingMode {
        AUTO = "AUTO",
        OFF = "OFF",
}

/** Offline: what happens when cache encryption cannot run at all (no SQLCipher in the build, or no secure key store). */
export enum EncryptionFailureBehavior {
        /** Default. Refuse to open the cache and run online-only; never write plaintext. */
        ONLINE_ONLY = "ONLINE_ONLY",
        /** Open an unencrypted cache instead. Wrong for compliance-driven encryption. */
        PLAINTEXT_FALLBACK = "PLAINTEXT_FALLBACK",
}

/** Offline: which backend actually holds the cache encryption key. */
export type OfflineKeyStorageKind = "KEYSTORE" | "SOFTWARE" | "NONE";

/** Offline: a custom key vault for the cache encryption key (`CometChat.setOfflineKeyVault`). */
export interface OfflineKeyVault {
        /** The stored 64-char hex key, or `null` if this service has none yet. */
        get(service: string): Promise<string | null>;
        /** Persist `hexKey` (64 hex chars) for `service`. Overwrites any existing entry. */
        set(service: string, hexKey: string): Promise<void>;
        /** Remove this service's entry. Must resolve (not throw) when nothing is stored. */
        delete(service: string): Promise<void>;
        /** The backend actually used; a vault that degraded reports `"SOFTWARE"`. */
        kind(): OfflineKeyStorageKind;
}

/**
 * Offline: supply the secure key vault for cache encryption. Only needed when `react-native-keychain`
 * is not installed (it is auto-detected). Call before `CometChat.init`; `null` resets to
 * auto-detection. Write-only: nothing public reads key material. An app-supplied vault is reported
 * as `keyStorage: "SOFTWARE"`.
 */
export function setOfflineKeyVault(vault: OfflineKeyVault | null): void;

/** Offline: what cache encryption is actually doing right now (`CometChat.getOfflineEncryptionStatus()`). */
export interface OfflineEncryptionStatus {
        /** What the app configured; `false` while the server kill switch is off. */
        enabled: boolean;
        /** The tier achieved for the store open right now. The full cross-SDK set; RN produces only `SQLCIPHER` or `NONE`. */
        atRest: "NONE" | "SQLCIPHER" | "FIELD_AES_GCM";
        /** Where the key in use lives (`KEYSTORE`, `SOFTWARE` or `NONE`); `NONE` when this session holds no key. */
        keyStorage: OfflineKeyStorageKind;
        /** With encryption configured: whether SQLCipher is in the build (regardless of switch/login). */
        cipherAvailable: boolean;
        /** SQLCipher's version string once an encrypted open is proven, else `null`. */
        cipher: string | null;
        /** Always filled: what is not encrypted (media files). */
        leakage: string;
}

/** Offline: error codes on `CometChatException.code`. */
export const OfflineErrorCode: {
        /**
         * An unsent message was removed (`clearOfflineCache()`, a conversation purge or `discardLocalMessage`); reason
         * `DISCARDED`. A logout or user switch also ends every unsent send of the session: the Promise `sendMessage`
         * returned rejects once with this code and no listener fires.
         */
        readonly MESSAGE_DISCARDED: "ERROR_OFFLINE_MESSAGE_DISCARDED";
        /** `retryMessage` on an id that is unknown or not FAILED. */
        readonly MESSAGE_NOT_RETRYABLE: "ERROR_OFFLINE_MESSAGE_NOT_RETRYABLE";
        /** `discardLocalMessage` / `retryMessage` on a send already on the wire (SENDING) — its answer decides (R160). */
        readonly MESSAGE_IN_FLIGHT: "ERROR_OFFLINE_MESSAGE_IN_FLIGHT";
        /** `discardLocalMessage` / `retryMessage` on an id that is unknown or already sent (R160). */
        readonly MESSAGE_NOT_FOUND: "ERROR_OFFLINE_MESSAGE_NOT_FOUND";
        /** No answer on 5 reconnects in a row (reason `TRANSIENT`); `retryMessage` / `retryAllFailedMessages` re-send it. */
        readonly AUTO_FLUSH_CAP_REACHED: "ERROR_OUTBOX_AUTO_FLUSH_CAP_REACHED";
        /** The outbox refused or evicted a send at its pending-count / media-byte cap; the reason is `QUEUE_FULL`, `QUEUE_OVERFLOW` or `BYTE_OVERFLOW`. */
        readonly PENDING_QUEUE_LIMIT: "ERROR_PENDING_QUEUE_LIMIT";
        readonly DISABLED: "ERROR_OFFLINE_DISABLED";
        readonly SYNC_IN_PROGRESS: "ERROR_OFFLINE_SYNC_IN_PROGRESS";
        readonly SYNC_COOLDOWN: "ERROR_OFFLINE_SYNC_COOLDOWN";
        /**
         * The offline store could not be read or written right now (busy, locked, full). Android's code. From
         * `getPendingMessages`, `retryMessage`, `retryAllFailedMessages` or `discardLocalMessage`: the store is
         * momentarily unavailable; try again. A send does not fail with it: a message the store cannot save when you
         * send it is sent once directly, without being queued (no pending callback, and no retry after a reconnect).
         */
        readonly MESSAGE_PERSIST_FAILED: "ERROR_OFFLINE_MESSAGE_PERSIST_FAILED";
        /** A queued media message's file could not be copied into the SDK's storage; the send fails for good (reason `PERMANENT`). Android's code. */
        readonly MEDIA_COPY_FAILED: "ERROR_OFFLINE_MEDIA_COPY_FAILED";
};

/** Offline: outbox behavior when the pending cap / media budget is hit. */
export enum PendingMessageOverflowPolicy {
        DROP_OLDEST = "DROP_OLDEST",
        REJECT_NEWEST = "REJECT_NEWEST",
}

/** Offline: catch-up sync state. */
export enum SyncState {
        IDLE = "IDLE",
        SYNCING = "SYNCING",
}

/**
 * Offline: configuration options. `cacheDurationDays` is in days, sizes in bytes. Bad values are normalized, never
 * rejected: `0`/`null` means unlimited only for the byte caps (`maxStorageSize`, `maxMediaCacheSize`) and no TTL for
 * `cacheDurationDays`; the count caps clamp to their range (`0` maps to the ceiling), and the snapshot keys
 * (`maxSnapshotQueries`, `snapshotTtlDays`) take their default for `0` or a negative value.
 */
export interface OfflineConfigOptions {
        /** Master gate. Nothing local opens unless this is `true`. Default `false`. */
        enabled?: boolean;
        /**
         * Encrypt the on-device cache at rest with SQLCipher (whole database file). Default `false`.
         * Needs `{"op-sqlite": {"sqlcipher": true}}` in your app's `package.json` and a secure key store
         * (`react-native-keychain`, or `CometChat.setOfflineKeyVault()`). Fixed for the session.
         */
        encryption?: boolean;
        /** What happens when encryption cannot run at all. Default `ONLINE_ONLY`. Only read when `encryption` is `true`. */
        encryptionFailureBehavior?: EncryptionFailureBehavior;
        /** Message retention TTL in **days** (int). `0` = no TTL prune. Default `0` (unlimited). */
        cacheDurationDays?: number;
        /** Logical DB byte ceiling. `0` = unlimited. Default 250 MB. */
        maxStorageSize?: number;
        /** Per-conversation cached window. Clamped to `[1, 1000]` (`0` maps to 1000, not unlimited). Default 500. */
        maxMessagesPerConversation?: number;
        /**
         * Cached conversation count (whole-conversation LRU). Default 100.
         *
         * Normalized into `[1, 1000]`: **`0` does NOT mean unlimited here** (it maps to
         * 1000), and anything above 1000 clamps to 1000. Guarantee: at most 1000
         * conversations are ever stored.
         */
        maxConversations?: number;
        /** Max distinct entity-list snapshots kept. `0` or negative means the default. Default 100. */
        maxSnapshotQueries?: number;
        /** Days a recorded entity-list snapshot stays valid. `0` or negative means the default. Default 7. */
        snapshotTtlDays?: number;
        /** Outbox cap. Clamped to `[1, 100]` (`0` maps to 100, not unlimited). Default 50. */
        maxPendingMessages?: number;
        /** Flush the pending outbox on reconnect. Default `true`. Gates only the flush — never the sweep. */
        autoSendPendingOnReconnect?: boolean;
        /** Behavior when the pending cap / media budget is hit. Default `REJECT_NEWEST`. */
        pendingQueueOverflowPolicy?: PendingMessageOverflowPolicy;
        /** Media-only byte budget (LRU). `0` = unlimited. Default 500 MB. */
        maxMediaCacheSize?: number;
        /** Media caching mode (`AUTO`/`OFF`). Default `AUTO`. Unknown values fall back to the default. */
        mediaCaching?: MediaCachingMode;
}

/** Offline: immutable configuration. OFF by default; pass to `AppSettingsBuilder.setOfflineConfig`. */
export class OfflineConfig {
        constructor(options?: OfflineConfigOptions);
        /** A config with every default value (offline OFF). */
        static default(): OfflineConfig;
        /** Normalize `true` / `false` / a plain options object into an OfflineConfig. In the object form a missing `enabled` is `false`. */
        static fromJson(value: boolean | OfflineConfigOptions | null | undefined): OfflineConfig;
        isEnabled(): boolean;
        isEncryptionEnabled(): boolean;
        /** Android-named alias of `isEncryptionEnabled()`. */
        isEncryption(): boolean;
        getEncryptionFailureBehavior(): EncryptionFailureBehavior;
        getCacheDurationDays(): number;
        getMaxStorageSize(): number;
        getMaxMessagesPerConversation(): number;
        getMaxConversations(): number;
        getMaxSnapshotQueries(): number;
        getSnapshotTtlDays(): number;
        getMaxPendingMessages(): number;
        isAutoSendPendingOnReconnect(): boolean;
        getPendingQueueOverflowPolicy(): PendingMessageOverflowPolicy;
        getMediaCaching(): MediaCachingMode;
        getMaxMediaCacheSize(): number;
}

/** Offline: 3-phase per-call send listener. */
export interface MessageSentListener {
        /**
         * Message persisted to the local outbox (optimistic). Fires only when offline is enabled, with
         * `getMessageStatus() === PENDING` and `getLocalMessageId()` set.
         */
        onMessagePending?(message: BaseMessage): void;
        /** Server acknowledged the send (also after a reconnect for a queued send). */
        onMessageSent(message: BaseMessage): void;
        /**
         * With `reason` set: the send failed (the message is FAILED). With `reason == null` after
         * `onMessagePending`: the ONE not-connected notice of a queued send (offline at send time, or
         * the first attempt got no answer) — the message stays PENDING and `onMessageSent` (or a final
         * failure) still follows. Don't re-send it. The error carries `code: "FAILED_TO_FETCH"` and
         * `errorParams: { queued: true, status: "PENDING", localMessageId }`; the Promise form rejects
         * with the same error.
         */
        onError(error: CometChatException, reason?: MessageFailureReason | null): void;
}

/** Offline: two-phase message read listener (cache phase then server phase). */
/**
    * Two-phase threads-read listener: pass to `ThreadsRequest.fetchNext(listener)`.
    * Exactly one of `onServerThreads` / `onError` fires per read.
*/
export interface ThreadFetchListener {
        /** Instant result from the local cache (may be empty). An empty page is the end of what's cached, never the end of the list. */
        onCachedThreads?(threads: CometChat.MessageThread[]): void;
        /** The authoritative server page. */
        onServerThreads(threads: CometChat.MessageThread[]): void;
        /** Server-phase failure — including a clean offline. */
        onError(error: CometChatException): void;
}
/** The Android name of {@link ThreadFetchListener} (same interface). */
export type ThreadsFetchListener = ThreadFetchListener;

export interface MessageFetchListener {
        /** Instant result from the local cache — always fires first; empty when any filter is server-only. */
        onCachedMessages?(messages: BaseMessage[]): void;
        /** The authoritative server result (fires on both paths; the drop-in for the old promise resolve). */
        onServerMessages(messages: BaseMessage[]): void;
        /**
            * Server-phase failure — including a clean offline, even when `onCachedMessages`
            * already delivered. A cache-phase failure is non-fatal and never surfaces here.
            * Exactly one of `onServerMessages` / `onError` fires per read.
            */
        onError(error: CometChatException): void;
}

/** Offline: two-phase conversation read listener (cache phase then server phase). */
export interface ConversationFetchListener {
        onCachedConversations?(conversations: Conversation[]): void;
        onServerConversations(conversations: Conversation[]): void;
        /**
            * Server-phase failure — including a clean offline, even when
            * `onCachedConversations` already delivered. Exactly one of
            * `onServerConversations` / `onError` fires per read.
            */
        onError(error: CometChatException): void;
}

/** Offline: two-phase SINGLE-conversation read listener (cache phase then server phase). The public name on every SDK (BEH-READ-32). */
export interface ConversationDetailsListener {
        onCachedConversation?(conversation: Conversation): void;
        onServerConversation(conversation: Conversation): void;
        /**
            * Server-phase failure — including a clean offline, even when
            * `onCachedConversation` already delivered. Exactly one of
            * `onServerConversation` / `onError` fires per read.
            */
        onError(error: CometChatException): void;
}

/** Offline: two-phase BANNED-GROUP-MEMBER-list read listener (cache phase then server phase). */
export interface BannedGroupMemberFetchListener {
        onCachedBannedGroupMembers?(members: GroupMember[]): void;
        onServerBannedGroupMembers?(members: GroupMember[]): void;
        /** Android-named alias of `onCachedBannedGroupMembers` (implement either set). */
        onCachedGroupMembers?(members: GroupMember[]): void;
        /** Android-named alias of `onServerBannedGroupMembers` (implement either set). */
        onServerGroupMembers?(members: GroupMember[]): void;
        onError(error: CometChatException): void;
}

/** Offline: two-phase REACTION-list read listener (cache phase then server phase). */
export interface ReactionFetchListener {
        onCachedReactions?(reactions: Reaction[]): void;
        onServerReactions(reactions: Reaction[]): void;
        onError(error: CometChatException): void;
}

/** Offline: two-phase NOTIFICATION-FEED read listener (cache phase then server phase). */
export interface FeedItemFetchListener {
        onCachedFeedItems?(items: NotificationFeedItem[]): void;
        onServerFeedItems?(items: NotificationFeedItem[]): void;
        /** Android-named alias of `onCachedFeedItems` (implement either set). */
        onCachedNotificationFeedItems?(items: NotificationFeedItem[]): void;
        /** Android-named alias of `onServerFeedItems` (implement either set). */
        onServerNotificationFeedItems?(items: NotificationFeedItem[]): void;
        onError(error: CometChatException): void;
}
/** The Android name of {@link FeedItemFetchListener} (same interface). */
export type NotificationFeedFetchListener = FeedItemFetchListener;

/** Offline: two-phase GROUP-list read listener (cache phase then server phase). */
export interface GroupFetchListener {
        onCachedGroups?(groups: Group[]): void;
        onServerGroups(groups: Group[]): void;
        onError(error: CometChatException): void;
}

/** Offline: two-phase GROUP-MEMBER-list read listener (cache phase then server phase). */
export interface GroupMemberFetchListener {
        onCachedGroupMembers?(members: GroupMember[]): void;
        onServerGroupMembers(members: GroupMember[]): void;
        onError(error: CometChatException): void;
}

/** Offline: two-phase USER-list read listener (cache phase then server phase). */
export interface UserFetchListener {
        onCachedUsers?(users: User[]): void;
        onServerUsers(users: User[]): void;
        /**
            * Server-phase failure — including a clean offline, even when
            * `onCachedUsers` already delivered. Exactly one of
            * `onServerUsers` / `onError` fires per read.
            */
        onError(error: CometChatException): void;
}

/** Offline: two-phase SINGLE-message read listener (cache phase then server phase). */
export interface MessageDetailsListener {
        onCachedMessage?(message: BaseMessage): void;
        onServerMessage(message: BaseMessage): void;
        /**
            * Server-phase failure — including a clean offline, even when
            * `onCachedMessage` already delivered. Exactly one of
            * `onServerMessage` / `onError` fires per read.
            */
        onError(error: CometChatException): void;
}

/** Offline: global outbox observer (register via `CometChat.addOfflineMessageListener`). */
export interface OfflineMessageListener {
        onOutboxMessagePending?(message: BaseMessage): void;
        onOutboxMessageSent?(message: BaseMessage): void;
        onOutboxMessageFailed?(message: BaseMessage, reason: MessageFailureReason): void;
}

/** Offline: message-phase result of a catch-up sweep. */
export enum SyncOutcome {
        CAUGHT_UP = "CAUGHT_UP",
        PARTIAL = "PARTIAL",
}

/** Offline: phase-based catch-up sync observer (register via `CometChat.addSyncListener`). */
export interface SyncListener {
        onConversationSyncStarted?(): void;
        onConversationSyncCompleted?(conversations: Conversation[]): void;
        onConversationSyncError?(error: CometChatException): void;
        onMessageSyncStarted?(): void;
        onMessageSyncCompleted?(messages: BaseMessage[], outcome: SyncOutcome): void;
        onMessageSyncError?(error: CometChatException): void;
}

/** Offline: a typed media download failure (never a raw HTTP/network object). */
export interface MediaError {
        /** `MEDIA_OFFLINE_NOT_CACHED`, `MEDIA_DOWNLOAD_FAILED`, or `ERROR_INVALID_FILE_URL` (`downloadMedia` on an attachment with no URL). */
        code: string;
        message: string;
}

/**
 * Offline: RN-named per-call media download callbacks (accepted by `downloadMedia`). Each callback
 * carries the message's server id (its local id while unsent) and the attachment's key: its URL
 * without the query string.
 */
export interface MediaCallbackListener {
        onMediaDownloaded?(messageId: string, attachmentKey: string, localPath: string): void;
        /** Download progress as an integer percent 0..100 (best-effort, monotonic, known-length only). */
        onMediaProgress?(messageId: string, attachmentKey: string, percent: number): void;
        onMediaDownloadFailed?(messageId: string, attachmentKey: string, error: MediaError | CometChatException): void;
}

/**
 * Offline: the per-call listener of `downloadMedia` - Android's / JS's shape, with the RN names of
 * `MediaCallbackListener` accepted as aliases (RN names win when both are present).
 */
export interface DownloadMediaListener extends MediaCallbackListener {
        onSuccess?(localPath: string): void;
        /** Integer percent 0..100, best-effort, monotonic, known-length only. */
        onProgress?(percent: number): void;
        onError?(error: MediaError | CometChatException): void;
}

/** Offline: the global media-download listener. Background downloads carry no progress, so it has none. */
export interface MediaDownloadListener {
        onMediaDownloaded?(messageId: string, attachmentKey: string, localPath: string): void;
        onMediaDownloadFailed?(messageId: string, attachmentKey: string, error: MediaError): void;
}

/**
    * Offline: the outbox messages (PENDING / SENDING / FAILED), oldest first, each with `getLocalMessageId()` set.
    * Rejects with `OfflineErrorCode.MESSAGE_PERSIST_FAILED` when the open store cannot be read (busy, locked, full).
    * Resolves an empty list when no offline store is open (offline off, or during a start or restart), as on Android;
    * messages still on disk reappear once the store opens.
    */
export function getPendingMessages(): Promise<BaseMessage[]>;
/**
    * Offline: retry one send by its local id (`message.getLocalMessageId()`) — R160. A FAILED send is
    * reset to PENDING and retried; a PENDING send lifts the reconnect hold for it and every PENDING send
    * ahead of it in its conversation and attempts the queue now (oldest-first). A manual, one-shot attempt:
    * no answer leaves it PENDING with one not-connected notice. Rejected, never silent, with
    * `OfflineErrorCode.MESSAGE_IN_FLIGHT` (the send is on the wire), `MESSAGE_NOT_FOUND` (unknown or already
    * sent) or `MESSAGE_PERSIST_FAILED` (store blip) — it never re-sends a sent message.
    * Mirrors `sendMessage` — pass a listener and the result arrives on the listener
    * (returns `void`); omit it and you get the Promise. Never both.
    */
export function retryMessage(localMessageId: string): Promise<BaseMessage>;
export function retryMessage(localMessageId: string, listener: MessageSentListener): void;
/** Offline: retry every send that FAILED with reason `TRANSIENT` (5xx / 429). The listener, if given, sees each outcome. */
export function retryAllFailedMessages(): Promise<void>;
export function retryAllFailedMessages(listener: MessageSentListener): void;
/** Offline (R160, BEH-SEND-36): per-call listener for `discardLocalMessage` — success/error, no message. */
export interface DiscardMessageListener {
        /** The PENDING / FAILED send was removed from this device (its local id handed back). */
        onSuccess?(localMessageId: string): void;
        /** The discard was rejected and nothing changed (`MESSAGE_IN_FLIGHT` / `MESSAGE_NOT_FOUND` / `ERROR_OFFLINE_DISABLED` / `MESSAGE_PERSIST_FAILED`). */
        onError?(error: CometChatException): void;
}
/**
    * Offline (R160, BEH-SEND-36): discard one PENDING or FAILED send by its local id, device-only and
    * durably — its row, copied media, queued reply-count contribution and last-message-preview slot (which
    * falls back to the newest remaining message, or empty); a local-only conversation left empty is removed.
    * Works offline and survives a restart. The listener gets `onSuccess` and NOTHING else (no outbox event;
    * the original send's listener is released with no final outcome). Rejected, never silent, with
    * `OfflineErrorCode.MESSAGE_IN_FLIGHT` (on the wire), `MESSAGE_NOT_FOUND` (unknown / already sent),
    * `ERROR_OFFLINE_DISABLED` (offline off) or `MESSAGE_PERSIST_FAILED` (store blip).
    * Mirrors `retryMessage` — pass a listener (returns `void`) or omit it for the Promise. Never both.
    */
export function discardLocalMessage(localMessageId: string): Promise<void>;
export function discardLocalMessage(localMessageId: string, listener: DiscardMessageListener): void;
/** Offline: register a global outbox observer. */
export function addOfflineMessageListener(id: string, listener: OfflineMessageListener): void;
export function removeOfflineMessageListener(id: string): void;
/** Offline: optional callback form of `forceSyncNow` — surfaces the rejection codes below. */
export interface ForceSyncCallback {
        onSuccess?(): void;
        onError?(error: CometChatException): void;
}
/**
 * Offline: on-demand catch-up sweep, through the same single-flight + cooldown throttle
 * as the reconnect path. Resolves when the sweep completes. When it cannot run now the
 * Promise rejects (and `callback.onError` fires) with `USER_NOT_LOGED_IN` (the REST layer's code),
 * `ERROR_OFFLINE_DISABLED`, `ERROR_OFFLINE_SYNC_IN_PROGRESS` or
 * `ERROR_OFFLINE_SYNC_COOLDOWN` (whose `details.retryAfterMs` says when to retry).
 * `callback.onSuccess` fires when the sweep is accepted; the outcome arrives on the sync listener.
 */
export function forceSyncNow(callback?: ForceSyncCallback): Promise<void>;
/** Offline: current sync state (synchronous). */
export function getSyncState(): SyncState;
/** Offline: server time, in seconds, of the last completed sync (0 if never). */
export function getLastSyncTimestamp(): Promise<number>;
/** Offline: register a sync/cache observer. */
export function addSyncListener(id: string, listener: SyncListener): void;
export function removeSyncListener(id: string): void;
/**
 * Offline: download + cache a media message's attachment bytes; resolves with the local path. With offline not
 * active it resolves `null` and the listener's failure callback fires once with `ERROR_OFFLINE_DISABLED`.
 */
export function downloadMedia(message: MediaMessage | any, listener?: DownloadMediaListener): Promise<string | null>;
/** Offline: local path of a media message's cached bytes, or null if not cached. */
export function getCachedMediaPath(message: MediaMessage | any): Promise<string | null>;
/** Offline: register a global media-download observer (background AUTO / sweep downloads). */
export function addMediaDownloadListener(id: string, listener: MediaDownloadListener): Promise<void>;
/** Offline: remove a global media-download observer. */
export function removeMediaDownloadListener(id: string): void;
/** Offline: total local bytes on disk (DB + media). */
export function getCacheSize(): Promise<number>;
/**
 * Offline: empty the per-user cache in place (the store stays open and keeps its key) and delete
 * its media. Each PENDING/SENDING message not already posted ends with `onError` /
 * `onOutboxMessageFailed`, reason `DISCARDED`; one already posted that the server then accepts is
 * reported sent (`onMessageSent` / `onOutboxMessageSent`) and not cached again, otherwise it ends
 * `DISCARDED`. FAILED ones are removed silently. No-op unless offline is active.
 */
export function clearOfflineCache(): Promise<void>;
/** Offline: be told when the SDK wiped and rebuilt the cache on its own (unreadable / corrupt store, encryption change). */
export function addOfflineCacheResetListener(id: string, listener: OfflineCacheResetListener): void;
export function removeOfflineCacheResetListener(id: string): void;
/**
 * Offline: whether offline messaging is actually active right now for the logged-in user — the
 * app enabled it, the server has not switched it off, and the local store is open. False before
 * login, after logout, while the server switch is off, while dormant because encryption cannot
 * run, and during a settings restart. Synchronous. UI layers call this at the moment of each
 * offline-dependent decision and keep no copy of the answer.
 */
export function isOfflineEnabled(): boolean;

/**
 * Offline: what the on-device cache encryption is actually doing — what was proven, not what was
 * configured. `cipherAvailable: false` means SQLCipher is not in the build; `keyStorage: "NONE"`
 * means no secure key store. Never returns the key or its length.
 */
export function getOfflineEncryptionStatus(): OfflineEncryptionStatus;

/**
 * Offline: the media caching mode in effect — `OfflineConfig.mediaCaching` while offline is active,
 * and `OFF` whenever `isOfflineEnabled()` is false. Fixed for the SDK session.
 */
export function getMediaCachingMode(): MediaCachingMode;

}

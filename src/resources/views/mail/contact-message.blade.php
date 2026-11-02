<x-mail::message>
# New project inquiry

Someone filled in the contact form on your portfolio.

<x-mail::table>
| | |
|:--|:--|
| **Name** | {{ $contactMessage->name }} |
| **Email** | [{{ $contactMessage->email }}](mailto:{{ $contactMessage->email }}) |
| **Company** | {{ $contactMessage->company ?: 'Not given' }} |
| **Project type** | {{ $contactMessage->project_type ?: 'Not given' }} |
| **Sent** | {{ $contactMessage->created_at->format('j M Y, g:i A') }} ({{ config('app.timezone') }}) |
</x-mail::table>

## Message

<x-mail::panel>
{!! nl2br(e($contactMessage->message)) !!}
</x-mail::panel>

<x-mail::button :url="'mailto:'.$contactMessage->email.'?subject='.rawurlencode('Re: your project inquiry')">
Reply to {{ $contactMessage->name }}
</x-mail::button>

You can also reply to this email directly. It goes to {{ $contactMessage->email }}.

<x-mail::subcopy>
This message is also saved in your admin panel under Contact Messages.
</x-mail::subcopy>
</x-mail::message>

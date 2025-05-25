import React from 'react'
import {render} from '@testing-library/react'
import WhatsAppButton from '../components/WhatsAppButton'

test('renders WhatsAppButton component', () => {
    const component = render(<WhatsAppButton/>)

    component.getByText('WhatsApp')
    component.getByRole('button', {name: /WhatsApp/i})
});
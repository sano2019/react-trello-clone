import React, { useState } from 'react';
import PropType from 'prop-types';

import { DeleteOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { LABELS } from '../../../core/constants';
import { GrayButton } from '../../../shared/components/Button';
import { CardBlock, Edit, TitleInput } from '../styles';
import { Label } from './common/Label';

export const Card = (props) => {
    const [showEditIcons, setEditIcons] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmitForm = async (event, callback, listKey, cardKey, title) => {
        event.preventDefault();
        await callback(listKey, cardKey, { title });
        setEditMode(false);
    };

    const getColor = (labels, text) => {
        const label = labels.find((label) => label.text === text);
        return label.color;
    };

    const { showModal, onEditCard, onDeleteCard, card, listKey } = props;

    return (
        <CardBlock
            onMouseEnter={() => setEditIcons(true)}
            onMouseLeave={() => setEditIcons(false)}
            onBlur={() => setEditMode(false)}
            editMode={editMode}
            onClick={showModal}
        >
            <div>
                {card && card.label && (
                    <Label color={getColor(LABELS, card.label)} text={card.label} small={true} />
                )}
            </div>
            {editMode ? (
                <form
                    onSubmit={(event) =>
                        handleSubmitForm(event, onEditCard, listKey, card.key, title)
                    }
                >
                    <TitleInput value={title} onChange={(event) => setTitle(event.target.value)} />
                </form>
            ) : (
                <React.Fragment>
                    {showEditIcons && (
                        <Edit onClick={(event) => event.stopPropagation()}>
                            <GrayButton onClick={() => onDeleteCard(listKey, card.key)}>
                                <DeleteOutlined />
                            </GrayButton>
                        </Edit>
                    )}
                    <div>{card.title}</div>
                </React.Fragment>
            )}
            <div>{card.description && <AlignLeftOutlined />}</div>
        </CardBlock>
    );
}


Card.propType = {
    listKey: PropType.string.isRequired,
    card: PropType.object.isRequired,
    showModal: PropType.func.isRequired,
    onEditCard: PropType.func.isRequired,
    onDeleteCard: PropType.func.isRequired,
};

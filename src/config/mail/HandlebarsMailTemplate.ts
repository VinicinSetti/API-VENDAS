import handlebars from "handlebars";

interface ITemplateVariable{
    [key: string]: string | number;
}

interface IParceMailTemplate{
    template: string;
    variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
    public async parse({template, variables}: IParceMailTemplate): Promise<string>{
        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}